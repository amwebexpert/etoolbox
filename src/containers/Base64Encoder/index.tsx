import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import EncodeIcon from '@mui/icons-material/Code';
import DecodeIcon from '@mui/icons-material/CodeOff';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import TextField from '@mui/material/TextField';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import { Box, Toolbar } from '@mui/material';
import FeatureTitle from '../../components/FeatureTitle';
import CopyButton from '../../components/CopyButton';
import { Helmet } from 'react-helmet';
import ResultMonospace from '../../components/ResultMonospace';
import { useIsWidthUp } from '../../theme';

const useStyles = makeStyles(theme => ({
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
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
}

const Base64Encoder: React.FC<Props> = (props: Props) => {
    const title = 'Base64 Encoder / decoder';
    const classes = useStyles();
    const isMdUp = useIsWidthUp('md');
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
                    autoFocus={isMdUp}
                    label="Content to Base64 encode/decode"
                    placeholder="Paste or type the content here"
                    multiline
                    minRows={4}
                    maxRows={isMdUp ? 20 : 4}
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    value={inputText}
                    onChange={e => storeInputText('lastBase64EncoderValue', e.target.value)}
                />

                <Toolbar className={classes.toolbar}>
                    <Button
                        variant="contained"
                        color="primary"
                        disabled={!transformed}
                        onClick={flip}
                        title="Switch the content">
                        <ImportExportIcon />
                    </Button>
                    <Box display="flex" flexGrow={1}></Box>
                    <CopyButton data={transformed} sx={{ mr: 1 }} />
                    <Button
                        sx={{ mr: 1 }}
                        variant="contained"
                        title="Encode the content"
                        color="primary"
                        disabled={!inputText}
                        onClick={() => setTransformed(services.transform(inputText, true))}>
                        <EncodeIcon />
                    </Button>
                    <Button
                        variant="contained"
                        title="Decode the content"
                        color="primary"
                        disabled={!inputText}
                        onClick={() => setTransformed(services.transform(inputText, false))}>
                        <DecodeIcon />
                    </Button>
                </Toolbar>

                <ResultMonospace label="Result" result={transformed} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Base64Encoder);
