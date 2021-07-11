import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import SimCardIcon from '@material-ui/icons/SimCard';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import ResultMonospace from '../../components/ResultMonospace';
import * as services from './services';

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
    toolbar: {
        '& > *': {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(1),
        },
    },
}));

interface UUIDForm {
    version: number;
    quantity: number;
}

interface Props {
    width: Breakpoint;
}

const UUIDGenerator: React.FC<Props> = (props: Props) => {
    const title = 'UUID Generator';
    const classes = useStyles();
    const { handleSubmit, control } = useForm();
    const [generated, setGenerated] = React.useState(services.generate(4, 1));

    const onSubmit = (data: UUIDForm) => {
        setGenerated(services.generate(data.version, data.quantity));
    };

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={SimCardIcon} title={title} />

                <div className={classes.form}>
                    <Grid container spacing={1}>
                        <Grid item md={2} sm={3} xs={6}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="uuidVersionLabel">Version</InputLabel>
                                <Controller
                                    control={control}
                                    name="version"
                                    defaultValue="4"
                                    render={({field: { value, name, onChange }}) => (
                                        <Select name={name} value={value} labelId="uuidVersionLabel" autoFocus={isWidthUp('md', props.width)} 
                                            onChange={e => onChange(e.target.value)}>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select>
                                    )}
                                    rules={{
                                        required: true,
                                        min: 1,
                                        max: 5,
                                    }}
                                />
                                <FormHelperText>RFC4122 version</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={2} sm={3} xs={6}>
                            <FormControl className={classes.formControl}>
                                <Controller
                                    name="quantity"
                                    render={({
                                        field: { value, name, onChange },
                                        fieldState: { invalid, error },
                                    }) => (
                                        <TextField name={name} value={value} label="Quantity" error={invalid} type="number"
                                            onChange={e => onChange(e.target.value)}
                                            helperText={invalid ? 'valid range: [1..9999]' : null} />
                                    )}
                                    control={control}
                                    defaultValue="5"
                                    rules={{
                                        required: true,
                                        min: 1,
                                        max: 9999,
                                    }}
                                />
                                <FormHelperText>Number of UUIDs</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={8} sm={6} xs={12}>
                            <Grid container justifyContent="flex-end" className={classes.toolbar}>
                                <CopyButton data={generated} />
                                <Button variant="contained" color="primary"
                                    onClick={handleSubmit(onSubmit)}
                                    endIcon={<SimCardIcon />}>Generate</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <ResultMonospace label="Result" result={generated} />
            </div>
        </>
    );
}

export default withWidth()(UUIDGenerator);
