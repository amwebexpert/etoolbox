import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Box, Toolbar } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import TextField from '@material-ui/core/TextField';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import FeatureTitle from '../../components/FeatureTitle';
import CopyButton from '../../components/CopyButton';
import { Helmet } from 'react-helmet';
import { usePreferenceTheme } from '../../components/Preferences/PreferencesProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    decoded: {
        padding: theme.spacing(1),
        borderColor: theme.palette.text.disabled,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        overflow: 'auto',
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

const JWTDecoder: React.FC<Props> = (props: Props) => {
    const title = 'JWT decoder…';
    const classes = useStyles();
    const {isDark} = usePreferenceTheme();
    const { inputText, storeInputText } = props;
    const [header, setHeader] = React.useState(services.decode(inputText, true));
    const [transformed, setTransformed] = React.useState(services.decode(inputText, false));

    function handleDecode() {
        setHeader(services.decode(inputText, true));
        setTransformed(services.decode(inputText, false));
    }

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={LockOpenIcon} title={title} />

                <form noValidate autoComplete="off">
                    <TextField
                        autoFocus={isWidthUp('md', props.width)}
                        id="jwt"
                        label="JSON web token to decode"
                        placeholder="Paste or type the content here"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        value={inputText}
                        onChange={(e) => storeInputText('lastJWT', e.target.value)}
                    />
                </form>

                <Toolbar className={classes.toolbar}>
                    <Box display='flex' flexGrow={1}></Box>
                    <CopyButton data={transformed} />
                    <Button variant="contained" color="primary" endIcon={<LockOpenIcon>Decode</LockOpenIcon>}
                        disabled={!inputText}
                        onClick={handleDecode}>Decode</Button>
                </Toolbar>

                <div className={classes.decoded}>
                    <div>
                        <SyntaxHighlighter language="json" style={isDark ? dark : docco}>
                            {header}
                        </SyntaxHighlighter>

                        <SyntaxHighlighter language="json" style={isDark ? dark : docco}>
                            {transformed}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastJWT']
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(JWTDecoder));
