import React from 'react';

import { useForm, Controller } from 'react-hook-form';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import { Box, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField, Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentTurnedIn from '@material-ui/icons/AssignmentTurnedIn';
import SimCardIcon from '@material-ui/icons/SimCard';

import * as copy from 'copy-to-clipboard';

import FeatureTitle from '../../components/FeatureTitle';
import * as services from './services';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';

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
    formatted: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        border: '1px solid grey',
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
    const classes = useStyles();
    const { handleSubmit, errors, control } = useForm();
    const { setToasterState } = useToasterUpdate();
    const [generated, setGenerated] = React.useState('');

    const handleCopy = (event: any) => {
        event.preventDefault();
        copy.default(generated, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    const onSubmit = (data: UUIDForm) => {
        setGenerated(services.generate(data.version, data.quantity));
    };

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={SimCardIcon} title="UUID Generator" />

            <form noValidate autoComplete="off" className={classes.form}>
                <Grid container spacing={1}>
                    <Grid item md={2} sm={3}>
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
                    <Grid item md={2} sm={3}>
                        <FormControl className={classes.formControl}>
                            <Controller
                                name="quantity"
                                as={
                                    <TextField label="Quantity" error={!!errors.quantity} type="number"
                                        helperText={errors.quantity ? 'valid range: [1..9999]' : null} />
                                }
                                control={control}
                                defaultValue="10"
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
                    <Grid item md={8} sm={6}>
                        <Grid container justify="flex-end" className={classes.toolbar}>
                            <Button endIcon={<AssignmentTurnedIn />}
                                variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
                            <Button variant="contained" color="primary"
                                onClick={handleSubmit(onSubmit)}
                                endIcon={<SimCardIcon />}>Generate</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

            <div className={classes.formatted}>
                <pre>{generated}</pre>
            </div>
        </div>
    );
}

export default withWidth()(UUIDGenerator);
