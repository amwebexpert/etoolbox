import React from 'react';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Dispatch } from 'redux';

import { setTextAction } from '../../actions/text-actions';
import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import { useSyntaxHighlightTheme } from '../../hooks/useSyntaxHighlightTheme';
import { AppState } from '../../reducers';
import { useIsWidthUp } from '../../theme';
import * as services from './services';

const useStyles = makeStyles(theme => ({
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
  },
}));

type Props = {
  inputText?: string;
  storeInputText: (name: string, value: string) => void;
};

const JWTDecoder: React.FC<Props> = (props: Props) => {
  const title = 'JWT decoder…';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const syntaxTheme = useSyntaxHighlightTheme();
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
            autoFocus={isMdUp}
            id="jwt"
            label="JSON web token to decode"
            placeholder="Paste or type the content here"
            multiline
            minRows={10}
            maxRows={isMdUp ? 20 : 10}
            variant="outlined"
            margin="normal"
            fullWidth={true}
            value={inputText}
            onChange={e => storeInputText('lastJWT', e.target.value)}
          />
        </form>

        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}></Box>
          <CopyButton data={transformed} sx={{ mr: 1 }} />
          <Button
            variant="contained"
            title="Decode the JWT Token"
            color="primary"
            endIcon={<LockOpenIcon>Decode</LockOpenIcon>}
            disabled={!inputText}
            onClick={handleDecode}>
            Decode
          </Button>
        </Toolbar>

        <div className={classes.decoded}>
          <div>
            <SyntaxHighlighter language="json" style={syntaxTheme}>
              {header}
            </SyntaxHighlighter>

            <SyntaxHighlighter language="json" style={syntaxTheme}>
              {transformed}
            </SyntaxHighlighter>
          </div>
        </div>
      </div>
    </>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastJWT'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JWTDecoder);
