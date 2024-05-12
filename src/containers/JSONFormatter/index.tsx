import React from 'react';

import SaveIcon from '@mui/icons-material/Save';
import WrapTextIcon from '@mui/icons-material/WrapText';
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
import * as fileService from '../../services/file-utils';
import { useIsWidthUp } from '../../theme';
import * as services from './services';

const useStyles = makeStyles((theme) => ({
  formatted: {
    borderColor: theme.palette.text.disabled,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
    maxHeight: '500px',
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

const JSONFormatter: React.FC<Props> = ({ inputText, storeInputText }) => {
  const title = 'JSON Formatter';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const syntaxTheme = useSyntaxHighlightTheme();
  const [formatted, setFormatted] = React.useState('');

  React.useEffect(() => {
    setFormatted(services.formatJson(inputText));
  }, [inputText]);

  const handleSaveAs = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileService.saveJsonAs(formatted);
  };

  return (
    <FeatureScreen iconType={WrapTextIcon} title={title}>
      <form noValidate autoComplete='off'>
        <div>
          <TextField
            autoFocus={isMdUp}
            label='JSON Content'
            placeholder='Paste or type the json content here'
            multiline={true}
            minRows={10}
            maxRows={isMdUp ? 20 : 10}
            variant='outlined'
            margin='normal'
            fullWidth={true}
            value={inputText}
            onChange={(e) => storeInputText('lastJSONFormatterValue', e.target.value)}
          />
        </div>
      </form>

      <Toolbar className={classes.toolbar}>
        <Box component='div' flexGrow={1}></Box>
        <CopyButton data={formatted} sx={{ mr: 1 }} />
        <Button
          endIcon={<SaveIcon>Save As…</SaveIcon>}
          disabled={!formatted}
          variant='contained'
          color='primary'
          onClick={handleSaveAs}
        >
          Save As…
        </Button>
      </Toolbar>

      <SyntaxHighlighter style={syntaxTheme} language='json' className={classes.formatted}>
        {formatted}
      </SyntaxHighlighter>
    </FeatureScreen>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastJSONFormatterValue'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch<SetTextInputAction>) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JSONFormatter);
