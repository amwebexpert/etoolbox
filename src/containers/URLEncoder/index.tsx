import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Box, Toolbar } from '@material-ui/core';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import TextField from '@material-ui/core/TextField';

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
    formatted: {
        padding: theme.spacing(1),
        borderColor: theme.palette.text.disabled,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
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

const URLEncoder: React.FC<Props> = (props: Props) => {
    const title = 'URL Encoder / decoder';
    const classes = useStyles();
    const { inputText, storeInputText } = props;
    const [transformed, setTransformed] = React.useState(services.transform(inputText, false));

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={LinkOffIcon} title={title} />

                <TextField
                    autoFocus={isWidthUp('md', props.width)}
                    label="Content to encode/decode"
                    placeholder="Paste or type the content here"
                    multiline
                    rows={4}
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    value={inputText}
                    onChange={(e) => storeInputText('lastUrlEncoderValue', e.target.value)}
                />

                <Toolbar className={classes.toolbar}>
                    <Box display='flex' flexGrow={1}></Box>
                    <CopyButton data={transformed} />
                    <Button variant="contained" color="primary" endIcon={<LinkIcon>Encode</LinkIcon>} disabled={!inputText}
                        onClick={() => setTransformed(services.transform(inputText, false))}>Enc.</Button>
                    <Button variant="contained" color="primary" endIcon={<LinkOffIcon>Decode</LinkOffIcon>} disabled={!inputText}
                        onClick={() => setTransformed(services.transform(inputText, true))}>Dec.</Button>
                </Toolbar>

                <div className={classes.formatted}>
                    {transformed}
                </div>
            </div>
        </>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastUrlEncoderValue']
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(URLEncoder));
