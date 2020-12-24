import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1.5),
    },
}));


const Home: React.FC = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <p>Welcome to the a collection of web developer utilities packaged as a desktop app!</p>

            <h2>Completed features</h2>
            <ul>
                <li>URL (and query string) Parser</li>
                <li>JSON Formatter/Validator</li>
                <li>URL Encoder/Decoder</li>
                <li>Base64 Encoder/Decoder</li>
                <li>Regular expression builder/tester</li>
                <li>UUID Generator</li>
            </ul>

            <h2>Roadmap (list of items in the TODO list...)</h2>
            <ul>
                <li>JWT Debugger</li>
                <li>HTML Entity Encoder/Decoder</li>
                <li>Unix Time Converter</li>
            </ul>
        </Paper>
    );
}

export default Home;
