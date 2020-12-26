import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import SaveIcon from '@material-ui/icons/Save';
import WrapTextIcon from '@material-ui/icons/WrapText';
import TextField from '@material-ui/core/TextField';
import * as copy from 'copy-to-clipboard';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import { Box, Toolbar } from '@material-ui/core';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import FeatureTitle from '../../components/FeatureTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    formatted: {
        border: '1px solid grey',
        maxHeight: '500px',
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
}));

interface Props {
    width: Breakpoint;
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
}

const JSONFormatter: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { setToasterState } = useToasterUpdate();
    const { inputText, storeInputText } = props;
    const [formatted, setFormatted] = React.useState(services.formatJson(inputText));

    React.useEffect(() => {
        setFormatted(services.formatJson(inputText));
    }, [inputText])

    const handleCopy = (event: any) => {
        event.preventDefault();
        copy.default(formatted, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    const handleSaveAs = (event: any) => {
        event.preventDefault();
        services.saveJsonAs(formatted);
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={WrapTextIcon} title="JSON Formatter" />

            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        autoFocus={isWidthUp('md', props.width)}
                        id="outlined-multiline-static"
                        label="JSON Content"
                        placeholder="Paste or type the json content here"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        value={inputText}
                        onChange={(e) => storeInputText('lastJSONFormatterValue', e.target.value)}
                    />
                </div>
            </form>

            <Toolbar className={classes.toolbar}>
                <Box display='flex' flexGrow={1}></Box>
                <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                    variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
                <Button endIcon={<SaveIcon>Save As...</SaveIcon>}
                    variant="contained" color="primary" onClick={handleSaveAs}>Save As...</Button>
            </Toolbar>

            <SyntaxHighlighter language="json" style={docco} className={classes.formatted}>
                {formatted}
            </SyntaxHighlighter>
        </div>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs.map.get('lastJSONFormatterValue')
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(JSONFormatter));
