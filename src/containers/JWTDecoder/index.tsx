import React from 'react';

import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Box, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Dispatch } from 'redux';

import { SetTextInputAction, setTextAction } from '../../actions/text-actions';
import CopyButton from '../../components/CopyButton';
import { FeatureScreen } from '../../components/FeatureScreen/FeatureScreen';
import { useSyntaxHighlightTheme } from '../../hooks/useSyntaxHighlightTheme';
import { AppState } from '../../reducers';
import { useIsWidthUp } from '../../theme';
import * as services from './services';

const useStyles = makeStyles((theme) => ({
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

const JWTDecoder: React.FC<Props> = ({ inputText, storeInputText }) => {
  const title = 'JWT decoder…';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const syntaxTheme = useSyntaxHighlightTheme();
  const [header, setHeader] = React.useState(services.decode(inputText, true));
  const [transformed, setTransformed] = React.useState(services.decode(inputText, false));

  function handleDecode() {
    setHeader(services.decode(inputText, true));
    setTransformed(services.decode(inputText, false));
  }

  return (
    <FeatureScreen iconType={LockOpenIcon} title={title}>
      <form noValidate autoComplete='off'>
        <TextField
          autoFocus={isMdUp}
          id='jwt'
          label='JSON web token to decode'
          placeholder='Paste or type the content here'
          multiline={true}
          minRows={10}
          maxRows={isMdUp ? 20 : 10}
          variant='outlined'
          margin='normal'
          fullWidth={true}
          value={inputText}
          onChange={(e) => storeInputText('lastJWT', e.target.value)}
        />
      </form>

      <Toolbar className={classes.toolbar}>
        <Box component='div' flexGrow={1}></Box>
        <CopyButton data={transformed} sx={{ mr: 1 }} />
        <Button
          variant='contained'
          title='Decode the JWT Token'
          color='primary'
          endIcon={<LockOpenIcon>Decode</LockOpenIcon>}
          disabled={!inputText}
          onClick={handleDecode}
        >
          Decode
        </Button>
      </Toolbar>

      <div className={classes.decoded}>
        <div>
          <SyntaxHighlighter language='json' style={syntaxTheme}>
            {header}
          </SyntaxHighlighter>

          <SyntaxHighlighter language='json' style={syntaxTheme}>
            {transformed}
          </SyntaxHighlighter>
        </div>
      </div>
    </FeatureScreen>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastJWT'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch<SetTextInputAction>) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JWTDecoder);
