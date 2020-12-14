import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import TextField from '@material-ui/core/TextField';
import * as copy from 'copy-to-clipboard';

import * as services from './services';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    formatted: {
        border: '1px solid grey',
        maxHeight: '500px',
    }
}));

const DEFAULT_VALUE = '{ "key": "value" }';

const JSONFormatter: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(DEFAULT_VALUE);
    const [formatted, setFormatted] = React.useState(services.formatJson(DEFAULT_VALUE));

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        setValue(newValue);
        setFormatted(services.formatJson(newValue));
    }

    const handleCopy = (event: any) => {
        event.preventDefault();
        copy.default(formatted, { format: 'text/plain' });
    }

    return (
        <div className={classes.root}>
            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="JSON Content"
                        placeholder="Paste or type the json content here"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        value={value}
                        onChange={handleChange}
                    />
                </div>
            </form>

            <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                variant="contained" color="primary" onClick={handleCopy}>Copy</Button>

            <SyntaxHighlighter language="json" style={docco} className={classes.formatted}>
                {formatted}
            </SyntaxHighlighter>
        </div>
    );
}

export default JSONFormatter;
