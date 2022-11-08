import React, { useDeferredValue } from 'react';

import TextRotationNoneIcon from '@mui/icons-material/TextRotationNone';
import { Box, Toolbar } from '@mui/material';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setTextAction } from '../../actions/text-actions';
import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import ResultMonospace from '../../components/ResultMonospace';
import { AppState } from '../../reducers';
import { useIsWidthUp } from '../../theme';
import * as services from './services';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  matches: {
    padding: theme.spacing(1),
    borderColor: theme.palette.text.disabled,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
    '& span': {
      backgroundColor: 'yellow',
      fontWeight: 'bold',
      color: 'black',
    },
  },
  toolbar: {
    margin: 0,
    padding: 0,
  },
}));

type Props = {
  inputText?: string;
  regularExpression?: string;
  storeInputText: (name: string, value: string) => void;
};

const RegExTester: React.FC<Props> = ({ regularExpression, inputText, storeInputText }) => {
  const title = 'Regular expressions tester';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const deferredRegularExpressionValue = useDeferredValue(regularExpression);
  const deferredInputTextValue = useDeferredValue(inputText);
  const [highlithedMatches, setHighlithedMatches] = React.useState('');
  const [extracted, setExtracted] = React.useState('');

  React.useEffect(() => {
    setHighlithedMatches(services.transform(deferredRegularExpressionValue, deferredInputTextValue));
    setExtracted(services.extract(deferredRegularExpressionValue, deferredInputTextValue));
  }, [deferredRegularExpressionValue, deferredInputTextValue]);

  return (
    <>
      <Helmet title={title} />
      <div className={classes.root}>
        <FeatureTitle iconType={TextRotationNoneIcon} title={title} />

        <TextField
          autoFocus={isMdUp}
          id="regex"
          label="Regular expression"
          placeholder="Type the regular expression. Example: /example/g"
          variant="outlined"
          margin="normal"
          fullWidth={true}
          value={regularExpression}
          onChange={e => storeInputText('lastRegEx', e.target.value)}
        />

        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}></Box>
          <CopyButton data={regularExpression} />
        </Toolbar>

        <TextField
          id="content"
          label="Content to test the regular expression against"
          placeholder="Paste or type the content here"
          multiline={true}
          minRows={6}
          maxRows={isMdUp ? 20 : 6}
          variant="outlined"
          margin="normal"
          fullWidth={true}
          value={inputText}
          onChange={e => storeInputText('lastRegExTextSample', e.target.value)}
        />

        <div className={classes.matches}>{ReactHtmlParser(highlithedMatches)}</div>

        <p>
          Collection of values. Could be usefull for Jira tickets numbers with expressions like:
          <br />
          <strong>issueKey in (FS-3456, WS-3213, FS-9988)</strong>
        </p>

        <ResultMonospace result={extracted} />

        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}></Box>
          <CopyButton data={extracted} />
        </Toolbar>
      </div>
    </>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    regularExpression: state.textInputs['lastRegEx'],
    inputText: state.textInputs['lastRegExTextSample'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RegExTester);
