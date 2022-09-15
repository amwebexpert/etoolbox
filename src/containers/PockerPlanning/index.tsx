import {
    Box,
    FormControl,
    Grid,
    isWidthUp,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
    withWidth,
    FormControlLabel,
    Switch,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField from '@material-ui/core/TextField';
import CreateTeam from '@material-ui/icons/CreateNewFolder';
import PockerPlanningIcon from '@material-ui/icons/Filter3';
import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setTextAction } from '../../actions/text-actions';
import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import { PokerCard } from './PokerCard';
import * as services from './services';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import ShareLink from '@material-ui/icons/Share';
import Delete from '@material-ui/icons/Delete';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { UserEstimate, SIMULATED_DATA, POKER_PLANNING_RATINGS_ENHANCED } from './model';

interface Props {
    width: Breakpoint;
    lastPockerPlanningTeamName?: string;
    lastPockerPlanningUsername?: string;
    storeInputText: (name: string, value: string) => void;
}

const PockerPlanning: React.FC<Props> = (props: Props) => {
    const title = 'Porker planning';
    const theme = useTheme();
    const classes = useStyles();
    const socketRef = useRef<WebSocket>();
    const [myEstimate, setMyEstimate] = useState<string>('');
    const [isEstimatesVisible, setIsEstimatesVisible] = useState<boolean>(false);
    const [estimates, setEstimates] = useState<UserEstimate[]>([]);
    const { lastPockerPlanningTeamName, lastPockerPlanningUsername, storeInputText } = props;

    useEffect(() => {
        const socket = new WebSocket('ws://localhost/ws');
        socket.onopen = () => {
            console.log('connection opening event');
        };
        socket.onmessage = (ev: MessageEvent<string>) => {
            const newEstimate: UserEstimate = JSON.parse(ev.data);
            setEstimates(estimates => [...estimates.filter(e => e.username !== newEstimate.username), newEstimate]);
        };
        socket.onclose = ev => {
            console.log('connection close event', ev.code);
        };
        socketRef.current = socket;
    }, [socketRef]);

    const handleStart = () => {
        console.log(lastPockerPlanningTeamName);
        const userEstimate: UserEstimate = {
            username: lastPockerPlanningUsername ?? '',
            estimate: myEstimate,
            estimatedAt: new Date(),
        };
        socketRef.current?.send(JSON.stringify(userEstimate));
    };

    const handleClearEstimates = () => {
        const newEstimates = [...estimates];
        newEstimates.forEach(e => (e.estimate = undefined));
        setEstimates(newEstimates);
        setIsEstimatesVisible(false);
        setMyEstimate('');
    };

    const values = estimates
        .map(e => e.estimate)
        .filter(e => e !== null && e !== undefined && e !== '?')
        .map(e => Number(e));
    const estimatesSum = values.reduce((acc, val) => acc + Number(val), 0);
    const estimatesAverage = values.length > 0 ? estimatesSum / values.length : 0;

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
                                    value={lastPockerPlanningTeamName}
                                    onChange={e => storeInputText('lastPockerPlanningTeamName', e.target.value)}
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
                                onClick={handleStart}>
                                Create & Join
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
                        <PokerCard
                            key={value}
                            isSelected={myEstimate === value}
                            value={value}
                            onClick={() => setMyEstimate(value)}
                        />
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
        lastPockerPlanningTeamName: state.textInputs['lastPockerPlanningTeamName'],
        lastPockerPlanningUsername: state.textInputs['lastPockerPlanningUsername'],
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(PockerPlanning));
