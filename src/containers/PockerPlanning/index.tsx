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
    withWidth,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField from '@material-ui/core/TextField';
import CreateTeam from '@material-ui/icons/CreateNewFolder';
import PockerPlanningIcon from '@material-ui/icons/Filter3';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setTextAction } from '../../actions/text-actions';
import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import { PokerCard } from './PokerCard';
import * as services from './services';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

interface Props {
    width: Breakpoint;
    lastPockerPlanningTeamName?: string;
    storePockerPlanningTeamName: (value: string) => void;
}

const PockerPlanning: React.FC<Props> = (props: Props) => {
    const title = 'Porker planning';
    const classes = useStyles();
    const { lastPockerPlanningTeamName, storePockerPlanningTeamName } = props;

    const handleTeamNameChange = () => {
        console.log(lastPockerPlanningTeamName);
        services.doSomething();
    };

    const onPokerCardClick = (value: string) => {
        console.log('onPokerCardClick', value);
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
                                    autoFocus={isWidthUp('md', props.width)}
                                    label="Team name"
                                    placeholder="Type the team name here"
                                    variant="outlined"
                                    fullWidth={true}
                                    margin="normal"
                                    value={lastPockerPlanningTeamName}
                                    onChange={e => storePockerPlanningTeamName(e.target.value)}
                                />
                            </FormControl>
                            <Button
                                variant="contained"
                                endIcon={<CreateTeam />}
                                title="Create the team and start planning"
                                color="primary"
                                onClick={handleTeamNameChange}>
                                Create
                            </Button>
                        </Box>
                        <div></div>
                    </Grid>
                </form>

                <div className={classes.submitEstimate}>
                    {services.POKER_PLANNING_RATINGS_ENHANCED.map(value => (
                        <PokerCard key={value} value={value} onClick={onPokerCardClick} />
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
                                        Story point(s) estimate
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {services.SIMULATED_DATA.map(({ username, estimate }) => (
                                    <StyledTableRow key={username}>
                                        <StyledTableCell>
                                            <Typography>{username}</Typography>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Typography>{estimate ?? 'N/A'}</Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
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
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storePockerPlanningTeamName: (value: string) => dispatch(setTextAction('lastPockerPlanningTeamName', value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(PockerPlanning));
