import {
    FormControl,
    Grid,
    isWidthUp,
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
import TextField from '@material-ui/core/TextField';
import RemoveEstimates from '@material-ui/icons/DeleteOutline';
import PockerPlanningIcon from '@material-ui/icons/Filter3';
import ShareLink from '@material-ui/icons/Share';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import RemoveUser from '@material-ui/icons/DeleteOutline';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ReconnectingWebSocket from 'reconnecting-websocket';
import { Dispatch } from 'redux';
import { v4 } from 'uuid';
import { setTextAction } from '../../actions/text-actions';
import ConfirmDialog from '../../components/ConfirmDialog';
import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import { isNotBlank } from '../../services/string-utils';
import { PokerPlanningSession, POKER_PLANNING_RATINGS_ENHANCED, SocketState, UserEstimate, UserMessage } from './model';
import PokerCard from './PokerCard';
import { getSocketState, parseEstimates } from './services';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

interface Props {
    width: Breakpoint;
    lastPockerPlanningRoomName?: string;
    lastPockerPlanningUsername?: string;
    lastPockerPlanningRoomUUID?: string;
    lastPockerPlanningHostName?: string;
    storeInputText: (name: string, value: string) => void;
}

const PokerPlanning: React.FC<Props> = (props: Props) => {
    const title = 'Porker planning';
    const classes = useStyles();
    const navigate = useNavigate();

    // component inputs
    const { hostName, roomUUID, roomName } = useParams();
    const {
        lastPockerPlanningRoomUUID,
        lastPockerPlanningRoomName,
        lastPockerPlanningUsername,
        lastPockerPlanningHostName,
        storeInputText,
    } = props;

    // component state
    const socketRef = useRef<ReconnectingWebSocket>();
    const [myEstimate, setMyEstimate] = useState<string>();
    const [socketState, setSocketState] = useState<SocketState>('closed');
    const [postponedMessage, setPostponedMessage] = useState<UserMessage>();
    const [isConfirmClearVotesOpen, setIsConfirmClearVotesOpen] = useState<boolean>(false);
    const [isEstimatesVisible, setIsEstimatesVisible] = useState<boolean>(false);
    const [estimates, setEstimates] = useState<UserEstimate[]>([]);

    // computing
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

        // socket creation on component unmount
        const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
        const url = `${protocol}://${lastPockerPlanningHostName}/ws?roomUUID=${lastPockerPlanningRoomUUID}`;
        const socket = new ReconnectingWebSocket(url);
        socket.onopen = () => setSocketState(getSocketState(socket.readyState));
        socket.onerror = () => setSocketState(getSocketState(socket.readyState));
        socket.onclose = () => setSocketState(getSocketState(socket.readyState));
        socket.onmessage = (ev: MessageEvent<string>) => {
            const session = JSON.parse(ev.data) as PokerPlanningSession;
            setEstimates(session.estimates);
        };

        socketRef.current = socket;
    }, [socketRef, isReadyToStartSession, lastPockerPlanningHostName, lastPockerPlanningRoomUUID]);

    useEffect(() => {
        // socket cleanup whenever component unmount
        return () => socketRef.current?.close();
    }, []);

    // send delayed message (if any)
    useEffect(() => {
        if (socketState === 'open' && postponedMessage) {
            socketRef.current?.send(JSON.stringify(postponedMessage));
            setPostponedMessage(undefined);
        }
    }, [postponedMessage, socketState]);

    const handleCreateNewRoom = () => {
        const newRoomUUID = v4();
        const url = `/PokerPlanning/${lastPockerPlanningHostName}/${newRoomUUID}/${lastPockerPlanningRoomName}`;
        navigate(url, { replace: true });
    };

    const handleClearEstimates = () => socketRef.current?.send(JSON.stringify({ type: 'reset' }));

    useEffect(() => {
        if (isEstimatesCleared) {
            setIsEstimatesVisible(false);
            setMyEstimate(undefined);
        }
    }, [isEstimatesCleared]);

    const handleRemoveUser = (username: string) =>
        socketRef.current?.send(JSON.stringify({ type: 'remove', payload: username }));

    const handleEnterRoom = () => {
        if (!lastPockerPlanningUsername) {
            return;
        }

        socketRef.current?.send(
            JSON.stringify({
                type: 'vote',
                payload: {
                    username: lastPockerPlanningUsername ?? '',
                },
            }),
        );
    };

    const updateMyEstimate = (value: string) => {
        setMyEstimate(value);
        const message: UserMessage = {
            type: 'vote',
            payload: {
                username: lastPockerPlanningUsername ?? '',
                estimate: value,
                estimatedAt: value ? new Date() : undefined,
            },
        };

        if (socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify(message));
        } else {
            setPostponedMessage(message);
        }
    };

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={PockerPlanningIcon} title={title} />

                <form noValidate autoComplete="off">
                    <Grid container spacing={1}>
                        <Grid item md={3} sm={6} xs={12}>
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
                        <Grid item md={3} sm={6} xs={12}>
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
                        <Grid item md={3} sm={6} xs={12}>
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
                        <Grid item md={3} sm={6} xs={12}>
                            <Grid container justifyContent="flex-end" alignItems="center" className={classes.toolbar}>
                                <Button
                                    variant="contained"
                                    title="Register the team and start planning in a new room"
                                    color="primary"
                                    onClick={handleCreateNewRoom}>
                                    New room
                                </Button>
                                <Button
                                    variant="contained"
                                    title="Enter existing room"
                                    color="primary"
                                    disabled={isUserMemberOfRoom || !isReadyToVote}
                                    onClick={handleEnterRoom}>
                                    Join
                                </Button>
                                <CopyButton
                                    data={window.location.href}
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
                        <Table size={isWidthUp('md', props.width) ? 'medium' : 'small'}>
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
                                            {isEstimatesVisible ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                        <IconButton
                                            onClick={() => setIsConfirmClearVotesOpen(true)}
                                            title="Clear all votes">
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
                                                        onClick={() => handleRemoveUser(username)}
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
                                        <Typography>
                                            {isEstimatesVisible ? estimatesAverage : <VisibilityOff />}
                                        </Typography>
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <ConfirmDialog
                title="Confirmation"
                isOpen={isConfirmClearVotesOpen}
                setIsOpen={setIsConfirmClearVotesOpen}
                onConfirm={handleClearEstimates}>
                Are you sure you want to delete all votes?
            </ConfirmDialog>
        </>
    );
};

export function mapStateToProps(state: AppState) {
    return {
        lastPockerPlanningHostName: state.textInputs['lastPockerPlanningHostName'],
        lastPockerPlanningRoomUUID: state.textInputs['lastPockerPlanningRoomUUID'],
        lastPockerPlanningRoomName: state.textInputs['lastPockerPlanningRoomName'],
        lastPockerPlanningUsername: state.textInputs['lastPockerPlanningUsername'],
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(PokerPlanning));
