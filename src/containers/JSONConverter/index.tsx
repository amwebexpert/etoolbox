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

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    form: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
    },
    encodedResult: {
        padding: theme.spacing(1),
        border: '1px solid grey',
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
    storeInputText: (name: string, value: string) => void;
}

const JSONConverter: React.FC<Props> = (props: Props) => {
    const title = 'JSON Converter';
    const classes = useStyles();
    const { handleSubmit, errors, control } = useForm();
    const { inputText, storeInputText } = props;
    const [transformed, setTransformed] = React.useState('');

    const onSubmit = (data: services.ConvertionContext) => {
        services.transform(data).then(setTransformed);
        console.log(data);
        console.log(control.getValues().targetLanguage);
    };

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={DeveloperModeIcon} title={title} />

                <div className={classes.form}>
                    <Grid container spacing={3}>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="sourceType">Source type</InputLabel>
                                <Controller
                                    control={control}
                                    name="sourceType"
                                    defaultValue="json"
                                    as={
                                        <Select labelId="sourceType">
                                            <MenuItem value="json">JSON</MenuItem>
                                        </Select>
                                    }
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
                                    defaultValue="java"
                                    as={
                                        <Select labelId="targetLanguage">
                                            <MenuItem value="csharp">C#</MenuItem>
                                            <MenuItem value="cpp">C++</MenuItem>
                                            <MenuItem value="dart">Dart</MenuItem>
                                            <MenuItem value="elm">Elm</MenuItem>
                                            <MenuItem value="flow">Flow</MenuItem>
                                            <MenuItem value="go">Go</MenuItem>
                                            <MenuItem value="java">Java</MenuItem>
                                            <MenuItem value="kotlin">Kotlin</MenuItem>
                                            <MenuItem value="objectivec">ObjectiveC</MenuItem>
                                            <MenuItem value="python">Python</MenuItem>
                                            <MenuItem value="rust">Rust</MenuItem>
                                            <MenuItem value="typescript">TypeScript</MenuItem>
                                            <MenuItem value="swift">Swift</MenuItem>
                                        </Select>
                                    }
                                />
                                <FormHelperText>The target language of the convertion</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <Controller
                                    name="rootClassName"
                                    as={
                                        <TextField label="Root class name" error={!!errors.rootClassName} type="text"
                                            helperText={errors.rootClassName ? 'field is required' : null} />
                                    }
                                    control={control}
                                    defaultValue="Root"
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
                            name="inputText"
                            as={
                                <TextField
                                    autoFocus={isWidthUp('md', props.width)}
                                    label="JSON data"
                                    placeholder="Paste or type the JSON here"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    margin="normal"
                                    value={inputText}
                                    error={!!errors.rootClassName}
                                    helperText={errors.rootClassName ? 'field is required' : null}
                                    onChange={(e) => storeInputText('lastJSON2Convert', e.target.value)}
                                />
                            }
                            control={control}
                            defaultValue={inputText || 'Root'}
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
                    <Button variant="contained" color="primary" endIcon={<LinkIcon>Encode</LinkIcon>} disabled={!inputText}
                        onClick={handleSubmit(onSubmit)}>Enc.</Button>
                </Toolbar>

                <SyntaxHighlighter language={control.getValues().targetLanguage} className={classes.encodedResult}>
                    {transformed}
                </SyntaxHighlighter>
            </div>
        </>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastJSON2Convert']
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(JSONConverter));
