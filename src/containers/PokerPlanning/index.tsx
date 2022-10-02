import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    withWidth,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { default as RemoveEstimates, default as RemoveUser } from '@material-ui/icons/DeleteOutline';
import PockerPlanningIcon from '@material-ui/icons/Filter3';
import HelpIcon from '@material-ui/icons/Help';
import ShareLink from '@material-ui/icons/Share';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Dispatch } from 'redux';
import { setTextAction } from '../../actions/text-actions';
import { useConfirmDialogContext } from '../../components/ConfirmDialog/ConfirmDialogProvider';
import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import { isNotBlank } from '../../services/string-utils';
import { IS_DEV_MODE } from '../../services/utils';
import { buildRemoveUserMessage, buildResetMessage, buildVoteMessage } from './message.factory';
import {
    CardsListingCategory,
    CardsListingCategoryName,
    CARDS_LISTING_CATEGORIES,
    DEFAULT_CARDS_LISTING_CATEGORY,
    SocketState,
} from './model';
import { PokerPlanningSession, UserMessage } from './common.model';
import PokerCard from './PokerCard';
import PokerOptionsForm from './PokerOptionsForm';
import { buildFullRouteURL, buildRouteURL, createSocket, parseEstimates } from './services';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

interface Props {
    width: Breakpoint;
    lastPokerPlanningRoomName?: string;
    lastPokerPlanningUsername?: string;
    lastPokerPlanningRoomUUID?: string;
    lastPokerPlanningHostName?: string;
    lastPokerCardsListingCategoryName?: CardsListingCategoryName;
    storeInputText: (name: string, value: string) => void;
}

const PokerPlanning: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const { showConfirmationDialog } = useConfirmDialogContext();

    // component inputs
    const { hostName, roomUUID, roomName } = useParams();
    const {
        lastPokerPlanningRoomUUID,
        lastPokerPlanningRoomName,
        lastPokerPlanningUsername,
        lastPokerPlanningHostName,
        lastPokerCardsListingCategoryName,
        storeInputText,
    } = props;

    // component state
    const socketRef = useRef<ReconnectingWebSocket>();
    const [socketState, setSocketState] = useState<SocketState>('closed');
    const [myEstimate, setMyEstimate] = useState<string>();
    const [postponedMessage, setPostponedMessage] = useState<UserMessage>();
    const [isEstimatesVisible, setIsEstimatesVisible] = useState<boolean>(false);
    const [pokerSession, setPokerSession] = useState<PokerPlanningSession>();

    // computing
    const title = `Poker planning ${lastPokerPlanningRoomName ?? ''}`.trim();
    const estimates = pokerSession?.estimates ?? [];
    const cardsListingCategoryName: CardsListingCategoryName = lastPokerCardsListingCategoryName
        ? lastPokerCardsListingCategoryName
        : DEFAULT_CARDS_LISTING_CATEGORY;
    const pokerCards: CardsListingCategory = CARDS_LISTING_CATEGORIES[cardsListingCategoryName];
    const { estimatesAverage, isEstimatesCleared, isUserMemberOfRoom } = parseEstimates(
        estimates,
        lastPokerPlanningUsername,
    );
    const isReadyToStartSession =
        isNotBlank(lastPokerPlanningHostName) &&
        isNotBlank(lastPokerPlanningRoomUUID) &&
        isNotBlank(hostName) &&
        isNotBlank(roomUUID);
    const isReadyToVote =
        isNotBlank(lastPokerPlanningHostName) &&
        isNotBlank(lastPokerPlanningRoomUUID) &&
        isNotBlank(lastPokerPlanningRoomName) &&
        isNotBlank(lastPokerPlanningUsername);

    // keep the store in sync whenever route params are updated
    useEffect(() => {
        if (roomName && roomUUID && hostName) {
            storeInputText('lastPokerPlanningRoomName', roomName);
            storeInputText('lastPokerPlanningRoomUUID', roomUUID);
            storeInputText('lastPokerPlanningHostName', hostName);
        }
    }, [roomUUID, roomName, hostName, storeInputText]);

    useEffect(() => {
        if (!pokerSession || !lastPokerPlanningUsername) {
            return;
        }

        if (IS_DEV_MODE) {
            console.info('poker session', pokerSession);
        }

        const myUserSessionEstimate = pokerSession?.estimates.find(e => e.username === lastPokerPlanningUsername);
        if (myUserSessionEstimate) {
            setMyEstimate(myUserSessionEstimate.estimate);
        }
    }, [lastPokerPlanningUsername, pokerSession]);

    useEffect(() => {
        if (!isReadyToStartSession) {
            return;
        }

        socketRef.current = createSocket({
            hostname: lastPokerPlanningHostName,
            roomUUID: lastPokerPlanningRoomUUID,
            onSessionUpdate: setPokerSession,
            onSocketStateUpdate: setSocketState,
        });
    }, [socketRef, isReadyToStartSession, lastPokerPlanningHostName, lastPokerPlanningRoomUUID]);

    useEffect(() => {
        // socket cleanup whenever component unmount
        return () => socketRef.current?.close();
    }, []);

    const handleCreateNewRoom = () => {
        const url = buildRouteURL({ hostname: lastPokerPlanningHostName, roomName: lastPokerPlanningRoomName });
        navigate(url, { replace: true });
    };

    useEffect(() => {
        if (isEstimatesCleared) {
            setIsEstimatesVisible(false);
            setMyEstimate(undefined);
        }
    }, [isEstimatesCleared]);

    const updateMyEstimate = (value?: string) => {
        if (value !== myEstimate) {
            setMyEstimate(value);
            sendOrPostpone(buildVoteMessage(lastPokerPlanningUsername, value));
        } else {
            setMyEstimate(undefined); // user is un-voting
            sendOrPostpone(buildVoteMessage(lastPokerPlanningUsername));
        }
    };

    const sendOrPostpone = (message: UserMessage) => {
        if (socketRef.current && socketState === 'open') {
            socketRef.current.send(JSON.stringify(message));
        } else {
            setPostponedMessage(message);
        }
    };

    const handleClearAllVotes = () =>
        showConfirmationDialog({
            title: 'Confirmation',
            description: 'Are you sure you want to delete all votes?',
            onConfirm: () => sendOrPostpone(buildResetMessage()),
        });

    // send delayed message (if any)
    useEffect(() => {
        if (socketRef.current && socketState === 'open' && postponedMessage) {
            socketRef.current.send(JSON.stringify(postponedMessage));
            setPostponedMessage(undefined);
        }
    }, [postponedMessage, socketState]);

    return (
        <>
            <Helmet title={title} />

            <div className={classes.root}>
                <FeatureTitle iconType={PockerPlanningIcon} title={title} />

                <Grid container>
                    <Grid item md={9} xs={12}>
                        <PokerOptionsForm socketState={socketState} />
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Grid container justifyContent="flex-end" alignItems="center" className={classes.toolbar}>
                            <Button
                                variant="contained"
                                title="Instruction to setup a poker planning server"
                                color="primary"
                                target="_blank"
                                href="https://github.com/amwebexpert/ws-poker-planning#production-deployments">
                                <HelpIcon />
                            </Button>
                            <Button
                                variant="contained"
                                title="Register the team and start planning in a new room"
                                color="primary"
                                onClick={handleCreateNewRoom}>
                                New
                            </Button>
                            <Button
                                variant="contained"
                                title="Enter existing room"
                                color="primary"
                                disabled={isUserMemberOfRoom || !isReadyToVote}
                                onClick={() => sendOrPostpone(buildVoteMessage(lastPokerPlanningUsername))}>
                                Join
                            </Button>
                            <CopyButton
                                data={buildFullRouteURL({
                                    hostname: lastPokerPlanningHostName,
                                    roomUUID: lastPokerPlanningRoomUUID,
                                    roomName: lastPokerPlanningRoomName,
                                })}
                                Icon={ShareLink}
                                hoverMessage="Copy link to clipboard for sharing"
                                feedbackMessage="Link copied to clipboard, you can now share to all members"
                            />
                        </Grid>
                    </Grid>
                </Grid>

                <div className={classes.submitEstimate}>
                    {pokerCards.values.map(value => (
                        <PokerCard
                            key={value}
                            isDisabled={!isReadyToVote}
                            isSelected={myEstimate === value}
                            value={value}
                            onClick={() => updateMyEstimate(value)}
                        />
                    ))}
                </div>

                <TableContainer component={Paper} className={classes.teamEstimates}>
                    <Table size="small">
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <StyledTableCell component="th" scope="row" width={30}></StyledTableCell>
                                <StyledTableCell component="th" scope="row">
                                    Team member
                                </StyledTableCell>
                                <StyledTableCell component="th" scope="row" align="center">
                                    Points
                                    <IconButton
                                        title="Toggle story points visibility"
                                        onClick={() => setIsEstimatesVisible(v => !v)}>
                                        {isEstimatesVisible ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                    <IconButton onClick={handleClearAllVotes} title="Clear all votes">
                                        <RemoveEstimates />
                                    </IconButton>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {estimates.sort(pokerCards.sorter).map(({ username, estimate }) => {
                                const estimateWhenDisplayON = estimate ?? '…';
                                const estimateWhenDisplayOFF = estimate ? '✔' : '…';
                                return (
                                    <StyledTableRow key={username}>
                                        <StyledTableCell width={30}>
                                            <IconButton
                                                onClick={() => sendOrPostpone(buildRemoveUserMessage(username))}
                                                title={`Remove user "${username}"`}>
                                                <RemoveUser />
                                            </IconButton>
                                        </StyledTableCell>
                                        <StyledTableCell>{username}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {isEstimatesVisible ? estimateWhenDisplayON : estimateWhenDisplayOFF}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                            <StyledTableRow key="average">
                                <StyledTableCell width={30}></StyledTableCell>
                                <StyledTableCell>
                                    <Typography>Story points average</Typography>
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <Typography>{isEstimatesVisible ? estimatesAverage : ''}</Typography>
                                </StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export function mapStateToProps(state: AppState) {
    return {
        lastPokerPlanningHostName: state.textInputs['lastPokerPlanningHostName'],
        lastPokerPlanningRoomUUID: state.textInputs['lastPokerPlanningRoomUUID'],
        lastPokerPlanningRoomName: state.textInputs['lastPokerPlanningRoomName'],
        lastPokerPlanningUsername: state.textInputs['lastPokerPlanningUsername'],
        lastPokerCardsListingCategoryName: state.textInputs[
            'lastPokerCardsListingCategoryName'
        ] as CardsListingCategoryName,
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(PokerPlanning));
