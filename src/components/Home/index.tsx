import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { getBuildUTCDate } from '../../services/utils';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
    },
    description: {
        margin: theme.spacing(3),
    },
    changes: {
        marginBottom: theme.spacing(3),
    },
    featuresList: {
        margin: theme.spacing(3),
    },
}));


const Home: React.FC = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Alert severity="success">
                <AlertTitle>Last build: {getBuildUTCDate()}</AlertTitle>
                <Typography variant="body1" align="center" className={classes.description}>
                    Welcome to the a collection of web developer utilities packaged as a desktop app!
                </Typography>
            </Alert>

            <div className={classes.featuresList}>

                <Typography variant="body1" className={classes.changes}>
                    v1.4.0 - Now allowing Javascript source to be converted to a target language. Also added lazy loading for modules.
                </Typography>


                <Typography variant="h5">Features…</Typography>

                <ul>
                    <li>URL (and query string) Parser, Encoder</li>
                    <li>JSON Formatter, Validator, Converter</li>
                    <li>Base64 string encoder/decoder</li>
                    <li>Regular expression builder/tester</li>
                    <li>UUID Generator</li>
                    <li>JWT Debugger</li>
                    <li>Base64 image encoder</li>
                    <li>QR Code generator (barcodes)</li>
                    <li>Image OCR (text extraction)</li>
                    <li>Color picker</li>
                    <li>Common web lists like HTML Entities, Mime-Types, ...</li>
                    <li>Github search user projects</li>
                </ul>
            </div>
        </Paper>
    );
}

export default Home;
