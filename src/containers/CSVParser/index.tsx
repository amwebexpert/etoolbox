import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  isWidthUp,
  Link,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
  withWidth,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import FileIcon from '@material-ui/icons/AttachmentOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import CSVParserIcon from '@material-ui/icons/GridOn';
import SaveIcon from '@material-ui/icons/Save';
import React from 'react';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {Dispatch} from 'redux';
import {setTextAction} from '../../actions/text-actions';
import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import {useSyntaxHighlightTheme} from '../../hooks/useSyntaxHighlightTheme';
import {AppState} from '../../reducers';
import {FILE_ENCODING_LABELS_SORTED, LabelAndName} from '../../services/encodings';
import * as fileService from '../../services/file-utils';
import * as services from './services';
import {useStyles} from './styled';

interface Props {
  width: Breakpoint;
  inputText?: string;
  inputEncoding?: string;
  inputOptions?: string;
  storeInputText: (name: string, value: string) => void;
}

const CSVParser: React.FC<Props> = (props: Props) => {
  const title = 'CSV parser';
  const classes = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();
  const {inputText, inputEncoding, inputOptions, storeInputText} = props;
  const [transformed, setTransformed] = React.useState('');
  const [rawParsedResult, setRawParsedResult] = React.useState('');
  const [fileInfo, setFileInfo] = React.useState('');
  const [isRunning, setIsRunning] = React.useState(false);
  const isMdUp = isWidthUp('md', props.width);
  const displayedRowsCount = isMdUp ? 10 : 4;

  const handleSaveAs = (event: any) => {
    event.preventDefault();
    fileService.saveJsonAs(transformed);
  };

  function handleClear(event: any) {
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
      storeInputText('lastCSVInputContent', ev.target!.result as string);
      setFileInfo(`${file.name} (${file.size} bytes)`);
      e.target.value = '';
    };
    const encoding: LabelAndName = FILE_ENCODING_LABELS_SORTED.find(enc => enc.label === inputEncoding)!;
    reader.readAsText(file, encoding?.name ?? 'utf-8');
  }

  React.useEffect(() => {
    async function parse() {
      try {
        const opts = inputOptions ? JSON.parse(inputOptions) : services.DEFAULT_OPTIONS;
        const result = await services.transform(inputText!, opts);
        setTransformed(JSON.stringify(result.data, null, 2));
        setRawParsedResult(JSON.stringify(result, null, 2));
        storeInputText('lastCSVInputOptions', JSON.stringify(opts, null, 2));
        setIsRunning(false);
      } catch (e) {
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
          <div>
            <input
              type="file"
              color="primary"
              accept="text/csv"
              onChange={e => onFileSelected(e)}
              id="icon-button-file"
              style={{display: 'none'}}
            />
            <label htmlFor="icon-button-file">
              <Button variant="contained" component="span" color="primary">
                File &nbsp; <FileIcon />
              </Button>
            </label>
          </div>

          <FormControl className={classes.formControl}>
            <InputLabel shrink id="encodingLabel">
              Encoding
            </InputLabel>
            <Select
              labelId="encodingLabel"
              id="encoding"
              value={inputEncoding}
              autoFocus={isMdUp}
              onChange={(e: any) => storeInputText('lastCSVInputContentEncoding', e.target.value)}>
              {FILE_ENCODING_LABELS_SORTED.map((item, index) => (
                <MenuItem key={`${index}-${item.label}`} value={item.label}>
                  {item.label} ({item.name})
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Specify the file encoding</FormHelperText>
          </FormControl>
        </Toolbar>

        <form noValidate autoComplete="off">
          <Grid container spacing={1}>
            <Grid item md={8} sm={12} xs={12}>
              <TextField
                name="inputText"
                label="CSV Source data"
                helperText={fileInfo}
                multiline
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  storeInputText('lastCSVInputContent', e.target.value)
                }
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
                multiline
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
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  storeInputText('lastCSVInputOptions', e.target.value)
                }
              />
            </Grid>
          </Grid>
        </form>

        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}></Box>
          <Button
            variant="contained"
            color="primary"
            endIcon={<AccountTreeIcon>Run</AccountTreeIcon>}
            disabled={!inputText || isRunning}
            onClick={() => setIsRunning(true)}>
            {isRunning ? 'Wait…' : 'Run'}
          </Button>
          <Button variant="contained" color="primary" disabled={!inputText} onClick={handleClear}>
            <DeleteIcon />
          </Button>
          <CopyButton data={transformed} />
          <Button
            endIcon={<SaveIcon>Save As...</SaveIcon>}
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
            <SyntaxHighlighter style={syntaxTheme} language="json" className={classes.encodedResult}>
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

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(CSVParser));
