import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Box, Toolbar } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { makeStyles } from '@material-ui/core/styles';
import TextRotationNoneIcon from '@material-ui/icons/TextRotationNone';
import TextField from '@material-ui/core/TextField';
import ReactHtmlParser from 'react-html-parser';
import { useDebouncedCallback } from 'use-debounce';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import FeatureTitle from '../../components/FeatureTitle';
import CopyButton from '../../components/CopyButton';
import { Helmet } from 'react-helmet';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    matches: {
        padding: theme.spacing(1),
        borderColor: theme.palette.text.disabled,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
        '& span': {
            backgroundColor: 'yellow',
            fontWeight: 'bold',
        }
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
    regularExpression?: string;
    storeInputText: (name: string, value: string) => void;
}

const RegExTester: React.FC<Props> = (props: Props) => {
    const title = 'Regular expressions tester';
    const classes = useStyles();
    const { regularExpression, inputText, storeInputText } = props;
    const [highlithedMatches, setHighlithedMatches] = React.useState('');
    const [extracted, setExtracted] = React.useState('');

    // https://www.npmjs.com/package/use-debounce
    const debounced = useDebouncedCallback(
        (regularExpression, inputText) => {
            setHighlithedMatches(services.transform(regularExpression, inputText));
            setExtracted(services.extract(regularExpression, inputText));
        },
        300
    );

    React.useEffect(
        // https://www.npmjs.com/package/use-debounce
        () => debounced.callback(regularExpression, inputText),
        [regularExpression, inputText, debounced]
    );

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={TextRotationNoneIcon} title={title} />

                <TextField
                    autoFocus={isWidthUp('md', props.width)}
                    id="regex"
                    label="Regular expression"
                    placeholder="Type the regular expression. Example: /example/g"
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    value={regularExpression}
                    onChange={(e) => storeInputText('lastRegEx', e.target.value)}
                />

                <Toolbar className={classes.toolbar}>
                    <Box display='flex' flexGrow={1}></Box>
                    <CopyButton data={regularExpression} />
                </Toolbar>

                <TextField
                    id="content"
                    label="Content to test the regular expression against"
                    placeholder="Paste or type the content here"
                    multiline
                    rows={6}
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    value={inputText}
                    onChange={(e) => storeInputText('lastRegExTextSample', e.target.value)}
                />

                <div className={classes.matches}>
                    {ReactHtmlParser(highlithedMatches)}
                </div>

                <p>
                    Collection of values. Could be usefull for Jira tickets numbers with expressions like:<br />
                    <strong>issueKey in (FS-3456, WS-3213, FS-9988)</strong>
                </p>
                <div className={classes.matches}>
                    {extracted}
                </div>
                <Toolbar className={classes.toolbar}>
                    <Box display='flex' flexGrow={1}></Box>
                    <CopyButton data={extracted} />
                </Toolbar>

            </div>
        </>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        regularExpression: state.textInputs['lastRegEx'],
        inputText: state.textInputs['lastRegExTextSample'],
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(RegExTester));
