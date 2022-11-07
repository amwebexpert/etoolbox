import React from 'react';

import EncodeIcon from '@mui/icons-material/Code';
import HttpUrlIcon from '@mui/icons-material/HttpTwoTone';
import { Box, Button, FormControl, MenuItem, TextField, Toolbar } from '@mui/material';
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
import { CONVERTERS_LIST, LANGUAGE_2_SYNTAX, transform } from './services';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  toolbar: {
    margin: 0,
    padding: 0,
  },
  formControl: {
    margin: theme.spacing(1),
  },
  encodedResult: {
    padding: theme.spacing(1),
    borderColor: theme.palette.text.disabled,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
}));

interface Props {
  inputText?: string;
  lastCurlTargetLanguage: string;
  storeInputText: (name: string, value: string) => void;
}

const CURLConverter: React.FC<Props> = ({ inputText, lastCurlTargetLanguage, storeInputText }: Props) => {
  const title = 'cURL converter';
  const classes = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();
  const isMdUp = useIsWidthUp('md');
  const [transformed, setTransformed] = React.useState(transform(inputText, lastCurlTargetLanguage));

  const onLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = e.target.value;
    storeInputText('lastCurlTargetLanguage', newLanguage);

    setTransformed(transform(inputText, newLanguage));
  };

  return (
    <>
      <Helmet title={title} />
      <div className={classes.root}>
        <FeatureTitle iconType={HttpUrlIcon} title={title} />

        <TextField
          autoFocus={isMdUp}
          label="cURL"
          placeholder="Paste or type the cURL command here"
          multiline
          minRows={4}
          maxRows={isMdUp ? 20 : 4}
          variant="outlined"
          margin="normal"
          fullWidth={true}
          inputProps={{ style: { fontFamily: 'monospace' } }}
          value={inputText}
          onChange={e => storeInputText('lastCurlValue', e.target.value)}
        />

        <Toolbar className={classes.toolbar}>
          <FormControl className={classes.formControl}>
            <TextField
              select
              name="targetLanguage"
              label="Target language"
              variant="outlined"
              title="Convert cURL command into a specific language"
              value={lastCurlTargetLanguage}
              style={{ width: 160 }}
              inputProps={{ style: { fontFamily: 'monospace' } }}
              onChange={onLanguageChange}>
              {CONVERTERS_LIST.map(item => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
          <Box display="flex" flexGrow={1}></Box>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            title="Convert cURL into target language"
            color="primary"
            endIcon={<EncodeIcon>Convert</EncodeIcon>}
            disabled={!inputText}
            onClick={() => setTransformed(transform(inputText, lastCurlTargetLanguage))}>
            Convert
          </Button>
          <CopyButton data={transformed} />
        </Toolbar>

        <SyntaxHighlighter
          style={syntaxTheme}
          language={LANGUAGE_2_SYNTAX.get(lastCurlTargetLanguage)}
          className={classes.encodedResult}>
          {transformed}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastCurlValue'],
    lastCurlTargetLanguage: state.textInputs['lastCurlTargetLanguage'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CURLConverter);
