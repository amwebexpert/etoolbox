import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { Box, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import EncodeIcon from '@mui/icons-material/Code';
import DecodeIcon from '@mui/icons-material/CodeOff';
import TextField from '@mui/material/TextField';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
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
  },
}));

interface Props {
  inputText?: string;
  storeInputText: (name: string, value: string) => void;
}

const URLEncoder: React.FC<Props> = (props: Props) => {
  const title = 'URL Encoder / decoder';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const { inputText, storeInputText } = props;
  const [transformed, setTransformed] = React.useState(services.transform(inputText, false));

  const flip = () => {
    storeInputText('lastUrlEncoderValue', transformed);
    setTransformed('');
  };

  return (
    <>
      <Helmet title={title} />
      <div className={classes.root}>
        <FeatureTitle iconType={DecodeIcon} title={title} />

        <TextField
          autoFocus={isMdUp}
          label="Content to encode/decode"
          placeholder="Paste or type the content here"
          multiline
          minRows={4}
          maxRows={isMdUp ? 20 : 4}
          variant="outlined"
          margin="normal"
          fullWidth={true}
          value={inputText}
          onChange={e => storeInputText('lastUrlEncoderValue', e.target.value)}
        />

        <Toolbar className={classes.toolbar}>
          <Button
            variant="contained"
            component="span"
            color="primary"
            disabled={!transformed}
            onClick={flip}
            title="Switch data content">
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
            onClick={() => setTransformed(services.transform(inputText, false))}>
            <EncodeIcon />
          </Button>
          <Button
            variant="contained"
            title="Decode the content"
            color="primary"
            disabled={!inputText}
            onClick={() => setTransformed(services.transform(inputText, true))}>
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
    inputText: state.textInputs['lastUrlEncoderValue'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(URLEncoder);
