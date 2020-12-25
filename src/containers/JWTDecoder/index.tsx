import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard';
import TextField from '@material-ui/core/TextField';
import * as copy from 'copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

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

const JWTDecoder: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { inputText, storeInputText } = props;
    const [header, setHeader] = React.useState(services.decode(inputText, true));
    const [transformed, setTransformed] = React.useState(services.decode(inputText, false));

    const handleCopy = (event: any) => {
        event.preventDefault();
        copy.default(transformed, { format: 'text/plain' });
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={LockOpenIcon} title="JWT decoder" />

            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        autoFocus
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
                </div>
            </form>

            <Toolbar className={classes.toolbar}>
                <Box display='flex' flexGrow={1}></Box>
                <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                    variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
                <Button variant="contained" color="primary" endIcon={<LockOpenIcon>Decode</LockOpenIcon>}
                    onClick={() => {
                        setHeader(services.decode(inputText, true));
                        setTransformed(services.decode(inputText, false));
                    }}>Decode</Button>
            </Toolbar>

            <SyntaxHighlighter language="json" style={docco} className={classes.formatted}>
                {header}
            </SyntaxHighlighter>

            <SyntaxHighlighter language="json" style={docco} className={classes.formatted}>
                {transformed}
            </SyntaxHighlighter>
        </div>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs.map.get('lastJWT')
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JWTDecoder);
