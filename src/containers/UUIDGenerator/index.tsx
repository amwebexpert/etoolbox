import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import SimCardIcon from '@mui/icons-material/SimCard';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Controller, useForm } from 'react-hook-form';
import CopyButton from '../../components/CopyButton';
import FeatureTitle from '../../components/FeatureTitle';
import ResultMonospace from '../../components/ResultMonospace';
import * as services from './services';
import { useIsWidthUp } from '../../theme';

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
    },
    form: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
    },
    toolbar: {},
}));

interface UUIDForm {
    version: number;
    quantity: number;
}

const UUIDGenerator: React.FC = () => {
    const title = 'UUID Generator';
    const classes = useStyles();
    const isMdUp = useIsWidthUp('md');
    const defaultValues = {
        version: 4,
        quantity: 5,
    };
    const { handleSubmit, control } = useForm({ defaultValues });
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
                            <FormControl className={classes.formControl} fullWidth={true}>
                                <Controller
                                    control={control}
                                    name="version"
                                    defaultValue={4}
                                    render={({ field: { value, name, onChange } }) => (
                                        <TextField
                                            select={true}
                                            name={name}
                                            value={value}
                                            label="Version"
                                            autoFocus={isMdUp}
                                            onChange={e => onChange(e.target.value)}>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </TextField>
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
                            <FormControl className={classes.formControl} fullWidth={true}>
                                <Controller
                                    name="quantity"
                                    render={({ field: { value, name, onChange }, fieldState: { invalid, error } }) => (
                                        <TextField
                                            name={name}
                                            value={value}
                                            label="Quantity"
                                            error={invalid}
                                            type="number"
                                            onChange={e => onChange(e.target.value)}
                                            helperText={invalid ? 'valid range: [1..9999]' : null}
                                        />
                                    )}
                                    control={control}
                                    defaultValue={5}
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
                                <CopyButton data={generated} sx={{ mr: 1 }} />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    title="Generate the UUID elements"
                                    onClick={handleSubmit(onSubmit)}
                                    endIcon={<SimCardIcon />}>
                                    Generate
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <ResultMonospace label="Result" result={generated} />
            </div>
        </>
    );
};

export default UUIDGenerator;
