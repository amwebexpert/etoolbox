import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import SelectAllIcon from '@material-ui/icons/SelectAll';
import TextField from '@material-ui/core/TextField';
import * as copy from 'copy-to-clipboard';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import { Box, Grid, Toolbar } from '@material-ui/core';
import FeatureTitle from '../../components/FeatureTitle';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    formatted: {
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
    inputOptions?: string;
    storeInputText: (name: string, value: string) => void;
}

const QRCodeGenerator: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { setToasterState } = useToasterUpdate();
    const { inputText, inputOptions, storeInputText } = props;
    const formattedInputOptions = services.jsonFormat(inputOptions);
    const [transformed, setTransformed] = React.useState('');

    const handleCopy = (event: any) => {
        event.preventDefault();
        // copy.default(transformed, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={SelectAllIcon} title="QR Code generator" />

            <form noValidate autoComplete="off">
                <Grid container spacing={1}>
                    <Grid item md={6} sm={12}>
                        <TextField
                            autoFocus={isWidthUp('md', props.width)}
                            label="Text to store into QR Code"
                            placeholder="Paste or type the content here"
                            multiline
                            rows={10}
                            variant="outlined"
                            margin="normal"
                            fullWidth={true}
                            value={inputText}
                            onChange={(e) => storeInputText('lastQRCodeTextValue', e.target.value)}
                        />
                    </Grid>
                    <Grid item md={6} sm={12}>
                        <TextField
                            label="QR Code generation options"
                            multiline
                            rows={10}
                            variant="outlined"
                            margin="normal"
                            fullWidth={true}
                            value={formattedInputOptions}
                            onChange={(e) => storeInputText('lastQRCodeOptions', e.target.value)}
                        />
                    </Grid>
                </Grid>
            </form>

            <Toolbar className={classes.toolbar}>
                <Box display='flex' flexGrow={1}></Box>
                <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                    variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
            </Toolbar>

            <div className={classes.formatted}>
                {transformed}
            </div>
        </div>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs.map.get('lastQRCodeTextValue'),
        inputOptions: state.textInputs.map.get('lastQRCodeOptions')
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(QRCodeGenerator));
