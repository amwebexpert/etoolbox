import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import TextField from '@material-ui/core/TextField';

import SyntaxHighlighter from 'react-syntax-highlighter';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import { Box, Toolbar } from '@material-ui/core';
import FeatureTitle from '../../components/FeatureTitle';
import CopyButton from '../../components/CopyButton';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    encodedResult: {
        padding: theme.spacing(1),
        border: '1px solid grey',
        whiteSpace: 'normal',
        wordBreak: 'break-word',
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

const JSONConverter: React.FC<Props> = (props: Props) => {
    const title = 'JSON Converter';
    const classes = useStyles();
    const { inputText, storeInputText } = props;
    const [transformed, setTransformed] = React.useState('');

    function handleTransform() {
        services.transform(inputText, 'java')
            .then(setTransformed);
    }

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={DeveloperModeIcon} title={title} />

                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                            autoFocus={isWidthUp('md', props.width)}
                            label="JSON data"
                            placeholder="Paste or type the JSON here"
                            multiline
                            rows={4}
                            variant="outlined"
                            margin="normal"
                            fullWidth={true}
                            value={inputText}
                            onChange={(e) => storeInputText('lastJSON2Convert', e.target.value)}
                        />
                    </div>
                </form>

                <Toolbar className={classes.toolbar}>
                    <Box display='flex' flexGrow={1}></Box>
                    <CopyButton data={transformed} />
                    <Button variant="contained" color="primary" endIcon={<LinkIcon>Encode</LinkIcon>} disabled={!inputText}
                        onClick={handleTransform}>Enc.</Button>
                </Toolbar>

                <SyntaxHighlighter language="java" className={classes.encodedResult}>
                    {transformed}
                </SyntaxHighlighter>
            </div>
        </>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastJSON2Convert']
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(JSONConverter));
