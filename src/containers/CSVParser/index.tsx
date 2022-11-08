import React from 'react';

import AccountTreeIcon from '@mui/icons-material/AccountTree';
import FileIcon from '@mui/icons-material/AttachmentOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import CSVParserIcon from '@mui/icons-material/GridOn';
import SaveIcon from '@mui/icons-material/Save';
import { Box, FormControl, Grid, Link, MenuItem, TextField, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import prettyBytes from 'pretty-bytes';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { Dispatch } from 'redux';

import { setTextAction } from '../../actions/text-actions';
import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import { useSyntaxHighlightTheme } from '../../hooks/useSyntaxHighlightTheme';
import { AppState } from '../../reducers';
import { FILE_ENCODING_LABELS_SORTED, LabelAndName } from '../../services/encodings';
import * as fileService from '../../services/file-utils';
import { useIsWidthUp } from '../../theme';
import * as services from './services';
import { useStyles } from './styled';

type Props = {
  inputText?: string;
  inputEncoding?: string;
  inputOptions?: string;
  storeInputText: (name: string, value: string) => void;
};

const CSVParser: React.FC<Props> = ({ inputText, inputEncoding, inputOptions, storeInputText }) => {
  const title = 'CSV Parser';
  const classes = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();
  const [transformed, setTransformed] = React.useState('');
  const [rawParsedResult, setRawParsedResult] = React.useState('');
  const [fileInfo, setFileInfo] = React.useState('');
  const [isRunning, setIsRunning] = React.useState(false);
  const isMdUp = useIsWidthUp('md');
  const displayedRowsCount = isMdUp ? 10 : 4;

  const handleSaveAs = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    fileService.saveJsonAs(transformed);
  };

  function handleClear(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setTransformed('');
    setRawParsedResult('');
    setFileInfo('');
    storeInputText('lastCSVInputContent', '');
  }

  function onFileSelected(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e?.target?.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev: ProgressEvent<FileReader>) => {
      if (!ev.target) {
        return;
      }
      storeInputText('lastCSVInputContent', ev.target.result as string);
      setFileInfo(`${file.name} (${prettyBytes(file.size)})`);
      e.target.value = '';
    };
    const encoding: LabelAndName | undefined = FILE_ENCODING_LABELS_SORTED.find(enc => enc.label === inputEncoding);
    reader.readAsText(file, encoding?.name ?? 'utf-8');
  }

  React.useEffect(() => {
    async function parse() {
      try {
        const opts = inputOptions ? JSON.parse(inputOptions) : services.DEFAULT_OPTIONS;
        const result = await services.transform(inputText ?? '', opts);
        setTransformed(JSON.stringify(result.data, null, 2));
        setRawParsedResult(JSON.stringify(result, null, 2));
        storeInputText('lastCSVInputOptions', JSON.stringify(opts, null, 2));
      } finally {
        setIsRunning(false);
      }
    }

    if (isRunning && inputText) {
      parse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, inputText]);

  return (
    <>
      <Helmet title={title} />
      <div className={classes.root}>
        <FeatureTitle iconType={CSVParserIcon} title={title} />

        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}></Box>
          <FormControl className={classes.formControl} sx={{ mr: 1 }}>
            <input
              type="file"
              color="primary"
              accept="text/csv"
              onChange={e => onFileSelected(e)}
              id="files-selector-action"
              data-testid="files-selector-action"
              style={{ display: 'none' }}
            />
            <label htmlFor="files-selector-action">
              <Button variant="contained" component="span" color="primary" title="Select the CSV file from your device">
                <FileIcon />
              </Button>
            </label>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
              select={true}
              label="File encoding"
              style={isMdUp ? { width: 320 } : undefined}
              id="encoding"
              value={inputEncoding}
              autoFocus={isMdUp}
              onChange={e => storeInputText('lastCSVInputContentEncoding', e.target.value)}>
              {FILE_ENCODING_LABELS_SORTED.map((item, index) => (
                <MenuItem key={`${index}-${item.label}`} value={item.label}>
                  {item.label} ({item.name})
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Toolbar>

        <form noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="inputText"
                label="CSV Source data"
                helperText={fileInfo}
                multiline={true}
                minRows={displayedRowsCount}
                maxRows={displayedRowsCount}
                variant="outlined"
                margin="normal"
                inputProps={{
                  style: {
                    fontFamily: 'monospace',
                    fontSize: '0.8em',
                    whiteSpace: 'nowrap',
                    overflowY: 'scroll',
                  },
                }}
                fullWidth={true}
                value={inputText}
                onChange={e => storeInputText('lastCSVInputContent', e.target.value)}
              />
            </Grid>
            <Grid item md={4} sm={12} xs={12}>
              <TextField
                name="inputOptions"
                label="Parser options"
                helperText={
                  <Link target="_blank" rel="noreferrer" href={services.OPTIONS_DOC_URL}>
                    Options documentation available here!
                  </Link>
                }
                multiline={true}
                minRows={displayedRowsCount}
                maxRows={displayedRowsCount}
                variant="outlined"
                margin="normal"
                inputProps={{
                  style: {
                    fontFamily: 'monospace',
                    fontSize: '0.8em',
                    whiteSpace: 'nowrap',
                    overflowY: 'scroll',
                  },
                }}
                fullWidth={true}
                value={inputOptions}
                onChange={e => storeInputText('lastCSVInputOptions', e.target.value)}
              />
            </Grid>
          </Grid>
        </form>

        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}></Box>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            title="Parse the CVS file content"
            color="primary"
            endIcon={<AccountTreeIcon>Run</AccountTreeIcon>}
            disabled={!inputText || isRunning}
            onClick={() => setIsRunning(true)}>
            {isRunning ? 'Wait…' : 'Run'}
          </Button>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            title="Clear the content"
            color="primary"
            disabled={!inputText}
            onClick={handleClear}>
            <DeleteIcon />
          </Button>
          <CopyButton data={transformed} sx={{ mr: 1 }} />
          <Button
            endIcon={<SaveIcon>Save As…</SaveIcon>}
            disabled={!transformed}
            variant="contained"
            color="primary"
            onClick={handleSaveAs}>
            Save…
          </Button>
        </Toolbar>

        {transformed && (
          <>
            <Typography>Parsed rows:</Typography>
            <SyntaxHighlighter
              data-testid="parsed-result"
              style={syntaxTheme}
              language="json"
              className={classes.encodedResult}>
              {transformed}
            </SyntaxHighlighter>
            <Typography>Parsed result with metadata:</Typography>
            <SyntaxHighlighter style={syntaxTheme} language="json" className={classes.encodedResult}>
              {rawParsedResult}
            </SyntaxHighlighter>
          </>
        )}
      </div>
    </>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastCSVInputContent'],
    inputEncoding: state.textInputs['lastCSVInputContentEncoding'],
    inputOptions: state.textInputs['lastCSVInputOptions'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSVParser);
