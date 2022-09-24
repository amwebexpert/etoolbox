import {
    FormControl,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
    withWidth,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField from '@material-ui/core/TextField';
import { default as RemoveEstimates, default as RemoveUser } from '@material-ui/icons/DeleteOutline';
import PockerPlanningIcon from '@material-ui/icons/Filter3';
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
import { buildRemoveUserMessage, buildResetMessage, buildVoteMessage } from './message.factory';
import {
    CARD_VALUES_CHOICES,
    PokerPlanningSession,
    POKER_PLANNING_RATINGS_ENHANCED,
    SocketState,
    UserMessage,
} from './model';
import PokerCard from './PokerCard';
import { buildFullRouteURL, buildRouteURL, createSocket, parseEstimates } from './services';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

interface Props {
    width: Breakpoint;
    lastPockerPlanningRoomName?: string;
    lastPockerPlanningUsername?: string;
    lastPockerPlanningRoomUUID?: string;
    lastPockerPlanningHostName?: string;
    lastPockerPlanningCardValuesList?: string;
    storeInputText: (name: string, value: string) => void;
}

const PokerPlanning: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const theme = useTheme();
    const navigate = useNavigate();
    const { showConfirmationDialog } = useConfirmDialogContext();

    // component inputs
    const { hostName, roomUUID, roomName } = useParams();
    const {
        lastPockerPlanningRoomUUID,
        lastPockerPlanningRoomName,
        lastPockerPlanningUsername,
        lastPockerPlanningHostName,
        lastPockerPlanningCardValuesList,
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
    const title = `Poker planning ${lastPockerPlanningRoomName ?? ''}`.trim();
    const estimates = pokerSession?.estimates ?? [];
    const { estimatesAverage, isEstimatesCleared, isUserMemberOfRoom } = parseEstimates(
        estimates,
        lastPockerPlanningUsername,
    );
    const isReadyToStartSession =
        isNotBlank(lastPockerPlanningHostName) &&
        isNotBlank(lastPockerPlanningRoomUUID) &&
        isNotBlank(hostName) &&
        isNotBlank(roomUUID);
    const isReadyToVote =
        isNotBlank(lastPockerPlanningHostName) &&
        isNotBlank(lastPockerPlanningRoomUUID) &&
        isNotBlank(lastPockerPlanningRoomName) &&
        isNotBlank(lastPockerPlanningUsername);

    // keep the store in sync whenever route params are updated
    useEffect(() => {
        if (roomName && roomUUID && hostName) {
            storeInputText('lastPockerPlanningRoomName', roomName);
            storeInputText('lastPockerPlanningRoomUUID', roomUUID);
            storeInputText('lastPockerPlanningHostName', hostName);
        }
    }, [roomUUID, roomName, hostName, storeInputText]);

    useEffect(() => {
        if (!isReadyToStartSession) {
            return;
        }

        socketRef.current = createSocket({
            hostname: lastPockerPlanningHostName,
            roomUUID: lastPockerPlanningRoomUUID,
            onSessionUpdate: setPokerSession,
            onSocketStateUpdate: setSocketState,
        });
    }, [socketRef, isReadyToStartSession, lastPockerPlanningHostName, lastPockerPlanningRoomUUID]);

    useEffect(() => {
        // socket cleanup whenever component unmount
        return () => socketRef.current?.close();
    }, []);

    const handleCreateNewRoom = () => {
        const url = buildRouteURL({ hostname: lastPockerPlanningHostName, roomName: lastPockerPlanningRoomName });
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
            sendOrPostpone(buildVoteMessage(lastPockerPlanningUsername, value));
        } else {
            setMyEstimate(undefined); // user is un-voting
            sendOrPostpone(buildVoteMessage(lastPockerPlanningUsername));
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

                <form noValidate autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid item md={2} xs={6}>
                            <FormControl className={classes.formControl} fullWidth={true}>
                                <TextField
                                    label={`Serveur (channel ${socketState})`}
                                    placeholder="Type the poker plannind hostname here"
                                    variant="outlined"
                                    fullWidth={true}
                                    margin="normal"
                                    value={lastPockerPlanningHostName}
                                    onChange={e => storeInputText('lastPockerPlanningHostName', e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={2} xs={6}>
                            <FormControl className={classes.formControl} fullWidth={true}>
                                <TextField
                                    label="Team name"
                                    placeholder="Type the team name here"
                                    variant="outlined"
                                    fullWidth={true}
                                    margin="normal"
                                    value={lastPockerPlanningRoomName}
                                    onChange={e => storeInputText('lastPockerPlanningRoomName', e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={2} xs={6}>
                            <FormControl className={classes.formControl} fullWidth={true}>
                                <TextField
                                    label="Your name"
                                    placeholder="Type your name here"
                                    variant="outlined"
                                    fullWidth={true}
                                    margin="normal"
                                    value={lastPockerPlanningUsername}
                                    onChange={e => storeInputText('lastPockerPlanningUsername', e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <FormControl className={classes.formControl} fullWidth={true}>
                                <Select
                                    style={{ marginTop: theme.spacing(2) }}
                                    variant="outlined"
                                    fullWidth={true}
                                    value={lastPockerPlanningCardValuesList}
                                    onChange={(e: any) =>
                                        storeInputText('lastPockerPlanningCardValuesList', e.target.value)
                                    }>
                                    {CARD_VALUES_CHOICES.map((value, index) => (
                                        <MenuItem key={index} value={index}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>{' '}
                        <Grid item md={3} xs={12}>
                            <Grid container justifyContent="flex-end" alignItems="center" className={classes.toolbar}>
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
                                    onClick={() => sendOrPostpone(buildVoteMessage(lastPockerPlanningUsername))}>
                                    Join
                                </Button>
                                <CopyButton
                                    data={buildFullRouteURL({
                                        hostname: lastPockerPlanningHostName,
                                        roomUUID: lastPockerPlanningRoomUUID,
                                        roomName: lastPockerPlanningRoomName,
                                    })}
                                    Icon={ShareLink}
                                    hoverMessage="Copy link to clipboard for sharing"
                                    feedbackMessage="Link copied to clipboard, you can now share to all members"
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </form>

                <div className={classes.submitEstimate}>
                    {POKER_PLANNING_RATINGS_ENHANCED.map(value => (
                        <PokerCard
                            key={value}
                            isDisabled={!isReadyToVote}
                            isSelected={myEstimate === value}
                            value={value}
                            onClick={() => updateMyEstimate(value)}
                        />
                    ))}
                </div>

                <div className={classes.teamEstimates}>
                    <TableContainer component={Paper}>
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
                                {estimates
                                    .sort((a, b) => a.username.localeCompare(b.username))
                                    .map(({ username, estimate }) => {
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
                                                    {isEstimatesVisible
                                                        ? estimateWhenDisplayON
                                                        : estimateWhenDisplayOFF}
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
            </div>
        </>
    );
};

export function mapStateToProps(state: AppState) {
    return {
        lastPockerPlanningHostName: state.textInputs['lastPockerPlanningHostName'],
        lastPockerPlanningRoomUUID: state.textInputs['lastPockerPlanningRoomUUID'],
        lastPockerPlanningRoomName: state.textInputs['lastPockerPlanningRoomName'],
        lastPockerPlanningUsername: state.textInputs['lastPockerPlanningUsername'],
        lastPockerPlanningCardValuesList: state.textInputs['lastPockerPlanningCardValuesList'],
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(PokerPlanning));
