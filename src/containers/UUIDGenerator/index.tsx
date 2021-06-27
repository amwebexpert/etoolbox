import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SimCardIcon from '@material-ui/icons/SimCard';

import FeatureTitle from '../../components/FeatureTitle';
import * as services from './services';
import CopyButton from '../../components/CopyButton';
import { Helmet } from 'react-helmet';
import ResultMonospace from '../../components/ResultMonospace';

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
    const { handleSubmit, errors, control } = useForm();
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
                                    as={
                                        <Select labelId="uuidVersionLabel" autoFocus={isWidthUp('md', props.width)}>
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                        </Select>
                                    }
                                    rules={{
                                        required: true,
                                        valueAsNumber: true,
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
                                    as={
                                        <TextField label="Quantity" error={!!errors.quantity} type="number"
                                            helperText={errors.quantity ? 'valid range: [1..9999]' : null} />
                                    }
                                    control={control}
                                    defaultValue="5"
                                    rules={{
                                        required: true,
                                        valueAsNumber: true,
                                        min: 1,
                                        max: 9999,
                                    }}
                                />
                                <FormHelperText>Number of UUIDs</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={8} sm={6} xs={12}>
                            <Grid container justify="flex-end" className={classes.toolbar}>
                                <CopyButton data={generated} />
                                <Button variant="contained" color="primary"
                                    onClick={handleSubmit(onSubmit)}
                                    endIcon={<SimCardIcon />}>Generate</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>

                <ResultMonospace result={generated} />
            </div>
        </>
    );
}

export default withWidth()(UUIDGenerator);
