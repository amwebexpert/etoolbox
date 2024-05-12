import React from 'react';

import EncodeIcon from '@mui/icons-material/Code';
import DecodeIcon from '@mui/icons-material/CodeOff';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { Box, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { SetTextInputAction, setTextAction } from '../../actions/text-actions';
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

const Base64Encoder: React.FC<Props> = ({ inputText, storeInputText }) => {
  const title = 'Base64 Encoder / decoder';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const [transformed, setTransformed] = React.useState('');

  const flip = () => {
    storeInputText('lastBase64EncoderValue', transformed);
    setTransformed('');
  };

  return (
    <FeatureScreen iconType={DeveloperBoardIcon} title={title}>
      <TextField
        autoFocus={isMdUp}
        label='Content to Base64 encode/decode'
        placeholder='Paste or type the content here'
        multiline={true}
        minRows={4}
        maxRows={isMdUp ? 20 : 4}
        variant='outlined'
        margin='normal'
        fullWidth={true}
        value={inputText}
        onChange={(e) => storeInputText('lastBase64EncoderValue', e.target.value)}
      />

      <Toolbar className={classes.toolbar}>
        <Button variant='contained' color='primary' disabled={!transformed} onClick={flip} title='Switch the content'>
          <ImportExportIcon />
        </Button>
        <Box component='div' flexGrow={1}></Box>
        <CopyButton data={transformed} sx={{ mr: 1 }} />
        <Button
          sx={{ mr: 1 }}
          variant='contained'
          title='Encode the content'
          color='primary'
          disabled={!inputText}
          onClick={() => setTransformed(services.transform(inputText, true))}
        >
          <EncodeIcon />
        </Button>
        <Button
          variant='contained'
          title='Decode the content'
          color='primary'
          disabled={!inputText}
          onClick={() => setTransformed(services.transform(inputText, false))}
        >
          <DecodeIcon />
        </Button>
      </Toolbar>

      <ResultMonospace label='Result' result={transformed} />
    </FeatureScreen>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastBase64EncoderValue'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch<SetTextInputAction>) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Base64Encoder);
