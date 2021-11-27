import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LinkIcon from '@material-ui/icons/Link';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import TextField from '@material-ui/core/TextField';

import SyntaxHighlighter from 'react-syntax-highlighter';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import { Box, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Toolbar } from '@material-ui/core';
import FeatureTitle from '../../components/FeatureTitle';
import CopyButton from '../../components/CopyButton';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import { useSyntaxHighlightTheme } from '../../hooks/useSyntaxHighlightTheme';

const useStyles = makeStyles((theme) => ({
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
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
}));

interface Props {
    width: Breakpoint;
    inputText?: string;
    optionSource?: string;
    optionTarget?: string;
    optionRootClassname?: string;
    storeInputText: (name: string, value: string) => void;
}

const JSONConverter: React.FC<Props> = (props: Props) => {
    const title = 'JSON Converter';
    const classes = useStyles();
    const syntaxTheme = useSyntaxHighlightTheme();
    const { inputText, optionSource, optionTarget, optionRootClassname, storeInputText } = props;
    const [transformed, setTransformed] = React.useState('');
    const defaultValues = {
        source: inputText,
        sourceType: optionSource,
        targetLanguage: optionTarget,
        rootClassName: optionRootClassname,
    };
    const { handleSubmit, control, getValues } = useForm({ defaultValues });
    const onSubmit = async (data: services.ConvertionContext) => {
        console.log(data);
        const result = await services.transform(data);
        setTransformed(result);
    };

    React.useEffect(() => {
        const data = getValues();
        storeInputText('lastJSON2ConvertOptionSource', data.sourceType!);
        storeInputText('lastJSON2ConvertOptionTarget', data.targetLanguage!);
        storeInputText('lastJSON2ConvertOptionRootClassname', data.rootClassName!);
        storeInputText('lastJSON2Convert', data.source!);
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
                                <InputLabel id="sourceType">Source type</InputLabel>
                                <Controller
                                    control={control}
                                    name="sourceType"
                                    render={({field: { value, name, onChange }}) => (
                                        <Select name={name} labelId="sourceType" value={value} onChange={e => onChange(e.target.value)}>
                                            <MenuItem value="json">JSON</MenuItem>
                                            <MenuItem value="jsObject">Javascript</MenuItem>
                                        </Select>
                                    )}
                                />
                                <FormHelperText>Input format or language</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="targetLanguage">Target language</InputLabel>
                                <Controller
                                    control={control}
                                    name="targetLanguage"
                                    render={({field: { value, name, onChange }}) => (
                                        <Select name={name} labelId="targetLanguage" value={value} onChange={e => onChange(e.target.value)}>
                                            <MenuItem value="csharp">C#</MenuItem>
                                            <MenuItem value="cpp">C++</MenuItem>
                                            <MenuItem value="dart">Dart</MenuItem>
                                            <MenuItem value="elm">Elm</MenuItem>
                                            <MenuItem value="flow">Flow</MenuItem>
                                            <MenuItem value="go">Go</MenuItem>
                                            <MenuItem value="haskell">Haskell</MenuItem>
                                            <MenuItem value="java">Java</MenuItem>
                                            <MenuItem value="javascript">Javascript object</MenuItem>
                                            <MenuItem value="json-schema">JSON Schema</MenuItem>
                                            <MenuItem value="kotlin">Kotlin</MenuItem>
                                            <MenuItem value="objectivec">ObjectiveC</MenuItem>
                                            <MenuItem value="pike">Pike</MenuItem>
                                            <MenuItem value="python">Python</MenuItem>
                                            <MenuItem value="rust">Rust</MenuItem>
                                            <MenuItem value="swift">Swift</MenuItem>
                                            <MenuItem value="typescript">TypeScript</MenuItem>
                                            <MenuItem value="json">JSON</MenuItem>
                                        </Select>
                                    )}
                                />
                                <FormHelperText>The target language of the convertion</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <Controller
                                    name="rootClassName"
                                    render={({
                                        field: { name, value, onChange },
                                        fieldState: { invalid },
                                    }) => (
                                        <TextField name={name} value={value} onChange={e => onChange(e.target.value)} label="Root class name" 
                                            error={invalid} type="text" helperText={invalid ? 'field is required' : null} />
                                    )}
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                />
                                <FormHelperText>Name of the parent class</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <FormControl className={classes.formControl} fullWidth={true}>
                        <Controller
                            name="source"
                            control={control}
                            render={({
                                field: { value, name, onChange },
                                fieldState: { invalid },
                            }) => (
                                <TextField
                                    name={name}
                                    onChange={e => onChange(e.target.value)}
                                    value={value}
                                    autoFocus={isWidthUp('md', props.width)}
                                    label="Source data"
                                    placeholder="Paste or type the source data here"
                                    multiline
                                    minRows={4}
                                    maxRows={isWidthUp('md', props.width) ? 20 : 4}
                                    variant="outlined"
                                    margin="normal"
                                    error={invalid}
                                    helperText={invalid ? 'field is required' : null}
                                />
                            )}
                            rules={{
                                required: true,
                            }}
                        />
                        <FormHelperText>Data to convert into the target language</FormHelperText>
                    </FormControl>

                </div>

                <Toolbar className={classes.toolbar}>
                    <Box display='flex' flexGrow={1}></Box>
                    <CopyButton data={transformed} />
                    <Button variant="contained" color="primary" endIcon={<LinkIcon>Encode</LinkIcon>}
                        onClick={handleSubmit(onSubmit)}>Enc.</Button>
                </Toolbar>

                <SyntaxHighlighter style={syntaxTheme} language={getValues().targetLanguage} className={classes.encodedResult}>
                    {transformed}
                </SyntaxHighlighter>
            </div>
        </>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastJSON2Convert'],
        optionSource: state.textInputs['lastJSON2ConvertOptionSource'],
        optionTarget: state.textInputs['lastJSON2ConvertOptionTarget'],
        optionRootClassname: state.textInputs['lastJSON2ConvertOptionRootClassname'],
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(JSONConverter));
