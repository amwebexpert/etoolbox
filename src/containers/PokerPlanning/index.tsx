import {
    Box,
    FormControl,
    FormControlLabel,
    Grid,
    isWidthUp,
    Paper,
    Switch,
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
import CreateTeam from '@material-ui/icons/CreateNewFolder';
import Delete from '@material-ui/icons/Delete';
import PockerPlanningIcon from '@material-ui/icons/Filter3';
import ShareLink from '@material-ui/icons/Share';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Dispatch } from 'redux';
import { v4 } from 'uuid';
import { setTextAction } from '../../actions/text-actions';
import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import { POKER_PLANNING_RATINGS_ENHANCED, SOCKET_STATES, UserEstimate, UserMessage } from './model';
import { PokerCard } from './PokerCard';
import { parseEstimates } from './services';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

interface Props {
    width: Breakpoint;
    lastPockerPlanningRoomName?: string;
    lastPockerPlanningUsername?: string;
    lastPockerPlanningRoomUUID?: string;
    storeInputText: (name: string, value: string) => void;
}

const PokerPlanning: React.FC<Props> = (props: Props) => {
    const title = 'Porker planning';
    const theme = useTheme();
    const classes = useStyles();
    const socketRef = useRef<WebSocket>();
    const [myEstimate, setMyEstimate] = useState<string>('');
    const [socketState, setSocketState] = useState<string>('');
    const [isEstimatesVisible, setIsEstimatesVisible] = useState<boolean>(false);
    const [estimates, setEstimates] = useState<UserEstimate[]>([]);
    const { lastPockerPlanningRoomUUID, lastPockerPlanningRoomName, lastPockerPlanningUsername, storeInputText } =
        props;
    const { roomUUID, roomName } = useParams();
    const navigate = useNavigate();
    const { estimatesAverage } = parseEstimates(estimates);

    // whenever route params are updated
    useEffect(() => {
        if (roomName && roomUUID) {
            // remember room UUID and name provided by route
            storeInputText('lastPockerPlanningRoomName', roomName);
            storeInputText('lastPockerPlanningRoomUUID', roomUUID);
        }
    }, [roomUUID, roomName, storeInputText]);

    useEffect(() => {
        if (!lastPockerPlanningRoomUUID) {
            return;
        }

        // socket creation on component unmount
        const socket = new WebSocket(`ws://localhost/ws?roomUUID=${lastPockerPlanningRoomUUID}`);
        socket.onopen = () => updateSocketState(socket.readyState);
        socket.onerror = () => updateSocketState(socket.readyState);
        socket.onclose = () => updateSocketState(socket.readyState);
        socket.onmessage = (ev: MessageEvent<string>) => setEstimates(JSON.parse(ev.data) as UserEstimate[]);

        socketRef.current = socket;
    }, [socketRef, lastPockerPlanningRoomUUID]);

    const updateSocketState = (state: number): void => setSocketState(SOCKET_STATES.get(state) ?? '');

    useEffect(() => {
        // socket cleanup whenever component unmount
        return () => socketRef.current?.close();
    }, []);

    const handleOpenNewRoom = () => {
        const newRoomUUID = v4();
        navigate(`/PockerPlanning/${newRoomUUID}/${lastPockerPlanningRoomName}`, { replace: true });
    };

    const handleClearEstimates = () => {
        socketRef.current?.send(JSON.stringify({ type: 'reset' }));
        setIsEstimatesVisible(false);
        setMyEstimate('');
    };

    const updateMyEstimate = (value: string) => {
        setMyEstimate(value);

        // TODO prevent button press if username is not provided
        // TODO usage of [new WebSocket + socket.onopen callback] to send the message if the readyState is not OPEN
        // socketRef.current?.onopen
        const message: UserMessage = {
            type: 'vote',
            payload: {
                roomUUID: lastPockerPlanningRoomUUID ?? '',
                username: lastPockerPlanningUsername ?? '',
                estimate: value,
                estimatedAt: new Date(),
            },
        };
        socketRef.current?.send(JSON.stringify(message));
    };

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={PockerPlanningIcon} title={title} />

                <form noValidate autoComplete="off">
                    <Grid container justifyContent="space-between">
                        <Box display="flex" alignItems="center">
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Team name"
                                    placeholder="Type the team name here"
                                    variant="outlined"
                                    margin="normal"
                                    value={lastPockerPlanningRoomName}
                                    onChange={e => storeInputText('lastPockerPlanningRoomName', e.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <TextField
                                    label="Your name"
                                    placeholder="Type your name here"
                                    variant="outlined"
                                    margin="normal"
                                    value={lastPockerPlanningUsername}
                                    onChange={e => storeInputText('lastPockerPlanningUsername', e.target.value)}
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                endIcon={<CreateTeam />}
                                title="Create the team and start planning"
                                color="primary"
                                onClick={handleOpenNewRoom}>
                                Join [{socketState}]
                            </Button>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Button variant="contained" color="primary" onClick={() => console.log('click ShareLink')}>
                                <ShareLink />
                            </Button>
                            <Box m={theme.spacing(0.125)} />
                            <Button variant="contained" color="primary" onClick={handleClearEstimates}>
                                <Delete />
                            </Button>
                        </Box>
                    </Grid>
                </form>

                <div className={classes.submitEstimate}>
                    {POKER_PLANNING_RATINGS_ENHANCED.map(value => (
                        <React.Fragment key={value}>
                            <PokerCard
                                key={value}
                                isSelected={myEstimate === value}
                                value={value}
                                onClick={() => updateMyEstimate(value)}
                            />
                        </React.Fragment>
                    ))}
                </div>

                <div className={classes.teamEstimates}>
                    <TableContainer component={Paper}>
                        <Table size={isWidthUp('md', props.width) ? 'medium' : 'small'}>
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    <StyledTableCell component="th" scope="row">
                                        Team member
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        Voted
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row" align="center">
                                        Story points
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow key="estimatesVisibility">
                                    <StyledTableCell>
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={isEstimatesVisible}
                                                    onChange={() => setIsEstimatesVisible(v => !v)}
                                                />
                                            }
                                            label="story points visibility"
                                        />
                                    </StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell align="center" onClick={() => setIsEstimatesVisible(v => !v)}>
                                        {isEstimatesVisible ? <Visibility /> : <VisibilityOff />}
                                    </StyledTableCell>
                                </StyledTableRow>
                                {estimates.map(({ username, estimate }) => (
                                    <StyledTableRow key={username}>
                                        <StyledTableCell>{username}</StyledTableCell>
                                        <StyledTableCell align="center">{estimate ? '✔' : ''}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            {isEstimatesVisible ? (
                                                estimate ?? '-'
                                            ) : estimate ? (
                                                <VisibilityOff />
                                            ) : (
                                                '...'
                                            )}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                <StyledTableRow key="average">
                                    <StyledTableCell>
                                        <Typography variant="h6">Average</Typography>
                                    </StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell align="center">
                                        <Typography variant="h6">
                                            {isEstimatesVisible ? estimatesAverage : '...'}
                                        </Typography>
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
        lastPockerPlanningRoomName: state.textInputs['lastPockerPlanningRoomName'],
        lastPockerPlanningUsername: state.textInputs['lastPockerPlanningUsername'],
        lastPockerPlanningRoomUUID: state.textInputs['lastPockerPlanningRoomUUID'],
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(PokerPlanning));
