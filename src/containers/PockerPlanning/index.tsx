import { Box, FormControl, Grid, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField from '@material-ui/core/TextField';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import PockerPlanningIcon from '@material-ui/icons/Filter3';
import UnderConstruction from '@material-ui/icons/ReportProblem';
import CreateTeam from '@material-ui/icons/CreateNewFolder';
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setTextAction } from '../../actions/text-actions';
import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import * as services from './services';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
    formControl: {
        marginRight: theme.spacing(1),
    },
    submitEstimate: {
        marginTop: theme.spacing(1),
    },
}));

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
                                title="Create the team and start planning"
                                color="primary"
                                onClick={handleTeamNameChange}>
                                <CreateTeam />
                            </Button>
                        </Box>
                        <div></div>
                    </Grid>
                </form>

                <div className={classes.submitEstimate}>
                    <Box display="flex" alignItems="center" justifyContent="center">
                        <UnderConstruction />
                        <Typography> Under construction: submitEstimate... </Typography>
                        <UnderConstruction />
                    </Box>
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
