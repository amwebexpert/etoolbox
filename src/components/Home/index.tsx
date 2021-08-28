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
        fontFamily: 'monospace',
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
                    Welcome to a collection of web developer utilities packaged as a desktop app!
                </Typography>
            </Alert>

            <div className={classes.featuresList}>
                <ul>
                    <li>v1.14.0 - Epoch converter and date/time utilities</li>
                    <li>v1.13.0 - Convert any input file as Base64 and not just Images: PDF, CSV, docx, ...</li>
                    <li>v1.12.0 - transform JSON to JS obj code, added more textarea lines for MD devices</li>
                    <li>v1.11.0 - Added named color filters and pagination</li>
                    <li>v1.10.0 - Added named colors (colors picker section)</li>
                    <li>v1.9.1 - lazy loading suspense fixed tab underline selector</li>
                    <li>v1.8.0 - Tab base navigation for Base64 features</li>
                    <li>v1.7.0 - lazy loading of all features</li>
                    <li>v1.6.0 - Added pagination for mime-types, html entities and GitHub search screens</li>
                    <li>v1.5.0 - New dark mode and preferences screen</li>
                    <li>v1.4.1..2 - Bug fixes</li>
                    <li>
                        v1.4.0 - Allow javascript source to be converted to many target languages. Also added lazy
                        loading for modules.
                    </li>
                    <li>v1.3.0 - Added Mime-Types and HTML entities collections</li>
                    <li>v1.2.0 - Image features: OCR, Base64 encoding, color picker</li>
                    <li>v1.0.0 - Initial revision</li>
                </ul>
            </div>
        </Paper>
    );
};

export default Home;
