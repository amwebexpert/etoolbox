import React from 'react';

import EncodeIcon from '@mui/icons-material/Code';
import DecodeIcon from '@mui/icons-material/CodeOff';
import SwitchContentIcon from '@mui/icons-material/ImportExport';
import { Box, Button, TextField, Toolbar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setTextAction } from '../../actions/text-actions';
import CopyButton from '../../components/CopyButton';
import { FeatureScreen } from '../../components/FeatureScreen/FeatureScreen';
import ResultMonospace from '../../components/ResultMonospace';
import { AppState } from '../../reducers';
import { useIsWidthUp } from '../../theme';
import * as services from './services';

const useStyles = makeStyles(() => ({
  toolbar: {
    margin: 0,
    padding: 0,
  },
}));

type Props = {
  inputText?: string;
  storeInputText: (name: string, value: string) => void;
};

const URLEncoder: React.FC<Props> = ({ inputText, storeInputText }) => {
  const title = 'URL Encoder / decoder';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const [transformed, setTransformed] = React.useState(services.transform(inputText, false));

  const flip = () => {
    storeInputText('lastUrlEncoderValue', transformed);
    setTransformed('');
  };

  const onContentChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newContent = e.target.value;
    storeInputText('lastUrlEncoderValue', newContent);
    if (!newContent) {
      setTransformed('');
    }
  };

  return (
    <FeatureScreen iconType={DecodeIcon} title={title}>
      <TextField
        autoFocus={isMdUp}
        label="Content to encode/decode"
        placeholder="Paste or type the content here"
        multiline={true}
        minRows={4}
        maxRows={isMdUp ? 20 : 4}
        variant="outlined"
        margin="normal"
        fullWidth={true}
        value={inputText}
        onChange={onContentChanged}
      />

      <Toolbar className={classes.toolbar}>
        <Button
          variant="contained"
          data-testid="switch-content-action"
          component="span"
          color="primary"
          disabled={!transformed}
          onClick={flip}
          title="Switch data content">
          <SwitchContentIcon />
        </Button>
        <Box display="flex" flexGrow={1}></Box>
        <CopyButton data={transformed} sx={{ mr: 1 }} />
        <Button
          sx={{ mr: 1 }}
          variant="contained"
          endIcon={<EncodeIcon />}
          title="Encode the content"
          color="primary"
          disabled={!inputText}
          onClick={() => setTransformed(services.transform(inputText, false))}>
          Enc.
        </Button>
        <Button
          variant="contained"
          endIcon={<DecodeIcon />}
          title="Decode the content"
          color="primary"
          disabled={!inputText}
          onClick={() => setTransformed(services.transform(inputText, true))}>
          Dec.
        </Button>
      </Toolbar>

      <ResultMonospace testID="parsed-result" label="Result" result={transformed} />
    </FeatureScreen>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastUrlEncoderValue'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(URLEncoder);
