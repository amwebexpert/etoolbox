import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import TextField from '@material-ui/core/TextField';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import { Box, Toolbar } from '@material-ui/core';
import FeatureTitle from '../../components/FeatureTitle';
import CopyButton from '../../components/CopyButton';
import { Helmet } from 'react-helmet';
import ResultMonospace from '../../components/ResultMonospace';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
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

const Base64Encoder: React.FC<Props> = (props: Props) => {
    const title = 'Base64 Encoder / decoder';
    const classes = useStyles();
    const { inputText, storeInputText } = props;
    const [transformed, setTransformed] = React.useState('');

    const flip = () => {
        storeInputText('lastBase64EncoderValue', transformed);
        setTransformed('');
    };

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={DeveloperBoardIcon} title={title} />

                <TextField
                    autoFocus={isWidthUp('md', props.width)}
                    label='Content to Base64 encode/decode'
                    placeholder='Paste or type the content here'
                    multiline
                    minRows={4}
                    maxRows={isWidthUp('md', props.width) ? 20 : 4}
                    variant='outlined'
                    margin='normal'
                    fullWidth={true}
                    value={inputText}
                    onChange={(e) => storeInputText('lastBase64EncoderValue', e.target.value)}
                />

                <Toolbar className={classes.toolbar}>
                    <Button variant='contained' color='primary' disabled={!transformed} onClick={flip}>
                        <ImportExportIcon />
                    </Button>
                    <Box display='flex' flexGrow={1}></Box>
                    <CopyButton data={transformed} />
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={!inputText}
                        onClick={() => setTransformed(services.transform(inputText, true))}
                    >
                        <LinkIcon />
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        disabled={!inputText}
                        onClick={() => setTransformed(services.transform(inputText, false))}
                    >
                        <LinkOffIcon />
                    </Button>
                </Toolbar>

                <ResultMonospace label='Result' result={transformed} />
            </div>
        </>
    );
};

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastBase64EncoderValue'],
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Base64Encoder));
