import React from 'react';

import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import LinkIcon from '@mui/icons-material/Link';
import { Box, FormControl, FormHelperText, Grid, MenuItem, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
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
  form: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(0),
  },
  converterOptions: {
    width: '100%',
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
  toolbar: {
    margin: 0,
    padding: 0,
  },
}));

type Props = {
  inputText?: string;
  optionSource?: string;
  optionTarget?: string;
  optionRootClassname?: string;
  storeInputText: (name: string, value: string) => void;
};

const JSONConverter: React.FC<Props> = ({
  inputText,
  optionSource,
  optionTarget,
  optionRootClassname,
  storeInputText,
}) => {
  const title = 'JSON Converter';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const syntaxTheme = useSyntaxHighlightTheme();
  const [transformed, setTransformed] = React.useState('');
  const defaultValues = {
    source: inputText ?? '',
    sourceType: optionSource ?? '',
    targetLanguage: optionTarget ?? '',
    rootClassName: optionRootClassname ?? '',
  };
  const { handleSubmit, control, getValues } = useForm({ defaultValues });
  const onSubmit = async (data: services.ConvertionContext) => {
    const result = await services.transform(data);
    setTransformed(result);
  };

  React.useEffect(() => {
    const data = getValues();
    storeInputText('lastJSON2ConvertOptionSource', data.sourceType ?? '');
    storeInputText('lastJSON2ConvertOptionTarget', data.targetLanguage ?? '');
    storeInputText('lastJSON2ConvertOptionRootClassname', data.rootClassName ?? '');
    storeInputText('lastJSON2Convert', data.source ?? '');
  }, [storeInputText, getValues, transformed]);

  return (
    <>
      <Helmet title={title} />
      <div className={classes.root}>
        <FeatureTitle iconType={DeveloperModeIcon} title={title} />

        <div className={classes.form}>
          <Grid container spacing={3} className={classes.converterOptions}>
            <Grid item>
              <FormControl className={classes.formControl}>
                <Controller
                  control={control}
                  name="sourceType"
                  render={({ field: { value, name, onChange } }) => (
                    <TextField
                      select={true}
                      name={name}
                      label="Source type"
                      value={value}
                      onChange={e => onChange(e.target.value)}>
                      <MenuItem value="json">JSON</MenuItem>
                      <MenuItem value="jsObject">Javascript</MenuItem>
                    </TextField>
                  )}
                />
                <FormHelperText>Input format or language</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <Controller
                  control={control}
                  name="targetLanguage"
                  render={({ field: { value, name, onChange } }) => (
                    <TextField
                      select={true}
                      name={name}
                      label="Target language"
                      value={value}
                      onChange={e => onChange(e.target.value)}>
                      {services.TARGET_LANGUAGES.map(([key, value]) => (
                        <MenuItem key={key} value={key}>
                          {value}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <FormHelperText>The target language of the convertion</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl className={classes.formControl}>
                <Controller
                  name="rootClassName"
                  render={({ field: { name, value, onChange }, fieldState: { invalid } }) => (
                    <TextField
                      name={name}
                      value={value}
                      onChange={e => onChange(e.target.value)}
                      label="Root class name"
                      error={invalid}
                      type="text"
                      helperText={invalid ? 'field is required' : null}
                    />
                  )}
                  control={control}
                  rules={{ required: true }}
                />
                <FormHelperText>Name of the parent class</FormHelperText>
              </FormControl>
            </Grid>
          </Grid>

          <FormControl className={classes.formControl} fullWidth={true}>
            <Controller
              name="source"
              control={control}
              render={({ field: { value, name, onChange }, fieldState: { invalid } }) => (
                <TextField
                  name={name}
                  onChange={e => onChange(e.target.value)}
                  value={value}
                  autoFocus={isMdUp}
                  label="Source data"
                  placeholder="Paste or type the source data here"
                  multiline={true}
                  minRows={4}
                  maxRows={isMdUp ? 20 : 4}
                  variant="outlined"
                  margin="normal"
                  error={invalid}
                  helperText={invalid ? 'field is required' : null}
                />
              )}
              rules={{ required: true }}
            />
            <FormHelperText>Data to convert into the target language</FormHelperText>
          </FormControl>
        </div>

        <Toolbar className={classes.toolbar}>
          <Box display="flex" flexGrow={1}></Box>
          <CopyButton data={transformed} sx={{ mr: 1 }} />
          <Button
            variant="contained"
            color="primary"
            endIcon={<LinkIcon>Encode</LinkIcon>}
            onClick={handleSubmit(onSubmit)}>
            Enc.
          </Button>
        </Toolbar>

        <SyntaxHighlighter style={syntaxTheme} language={getValues().targetLanguage} className={classes.encodedResult}>
          {transformed}
        </SyntaxHighlighter>
      </div>
    </>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastJSON2Convert'],
    optionSource: state.textInputs['lastJSON2ConvertOptionSource'],
    optionTarget: state.textInputs['lastJSON2ConvertOptionTarget'],
    optionRootClassname: state.textInputs['lastJSON2ConvertOptionRootClassname'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JSONConverter);
