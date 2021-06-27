import { Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import { getBuildUTCDate } from '../../services/utils';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    featuresList: {
        margin: theme.spacing(0),
    },
    panelTitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    panel: {
        borderColor: theme.palette.text.disabled,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
        width: '100%',
    },
}));

const Home: React.FC = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Alert severity='success'>
                <AlertTitle>Last build: {getBuildUTCDate()}</AlertTitle>
                <Typography variant='body1'>
                    Welcome to the a collection of web developer utilities packaged as a desktop app!
                </Typography>
            </Alert>

            <div className={classes.featuresList}>
                <ul>
                    <li>v1.4.3 - New dark mode and preferences screen</li>
                    <li>v1.4.2 - Bug fixes</li>
                    <li>v1.4.1 - Bug fixes</li>
                    <li>
                        v1.4.0 - Now allowing Javascript source to be converted to a target language. Also added lazy
                        loading for modules.
                    </li>
                </ul>
            </div>
        </Paper>
    );
};

export default Home;
