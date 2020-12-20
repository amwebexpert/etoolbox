import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import LinkIcon from '@material-ui/icons/Link';
import LinkOffIcon from '@material-ui/icons/LinkOff';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import TextField from '@material-ui/core/TextField';
import * as copy from 'copy-to-clipboard';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import { Box, Toolbar } from '@material-ui/core';
import FeatureTitle from '../../components/FeatureTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    formatted: {
        padding: theme.spacing(1),
        border: '1px solid grey',
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
    const classes = useStyles();
    const { inputText, storeInputText } = props;
    const [transformed, setTransformed] = React.useState(services.transform(inputText, true));

    const handleCopy = (event: any) => {
        event.preventDefault();
        copy.default(transformed, { format: 'text/plain' });
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={DeveloperBoardIcon} title="Base64 Encoder/decoder" />

            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        autoFocus
                        id="outlined-multiline-static"
                        label="Content to Base64 encode/decode"
                        placeholder="Paste or type the content here"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        value={inputText}
                        onChange={(e) => storeInputText('lastBase64EncoderValue', e.target.value)}
                    />
                </div>
            </form>

            <Toolbar className={classes.toolbar}>
                <Box display='flex' flexGrow={1}></Box>
                <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                    variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
                <Button variant="contained" color="primary" endIcon={<LinkIcon>Encode</LinkIcon>}
                    onClick={() => setTransformed(services.transform(inputText, true))}>Encode</Button>
                <Button variant="contained" color="primary" endIcon={<LinkOffIcon>Decode</LinkOffIcon>}
                    onClick={() => setTransformed(services.transform(inputText, false))}>Decode</Button>
            </Toolbar>

            <div className={classes.formatted}>
                {transformed}
            </div>
        </div>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs.map.get('lastBase64EncoderValue')
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base64Encoder);
