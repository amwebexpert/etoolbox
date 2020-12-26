import React from 'react';

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
        padding: theme.spacing(1),
        border: '1px solid grey',
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
}));

const UUIDGenerator: React.FC = () => {
    const classes = useStyles();
    const { setToasterState } = useToasterUpdate();
    const [version, setVersion] = React.useState(4);
    const [quantity, setQuantity] = React.useState(1);
    const [generated, setGenerated] = React.useState(services.generate(version, quantity));

    const handleCopy = (event: any) => {
        event.preventDefault();
        copy.default(generated, { format: 'text/plain' });
        setToasterState({ open: true, message: 'Content copied into clipboard', type: 'success', autoHideDuration: 2000 });
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={SimCardIcon} title="UUID Generator" />

            <form noValidate autoComplete="off" className={classes.form}>
                <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={1}>
                    <Grid container spacing={1}>
                        <Grid item md={1} sm={2} xs={3}>
                            <FormControl className={classes.formControl}>
                                <InputLabel id="uuidVersionLabel">Version</InputLabel>
                                <Select
                                    labelId="uuidVersionLabel"
                                    autoFocus
                                    id="uuidVersion"
                                    value={version}
                                    onChange={(e: any) => setVersion(e.target.value)}
                                >
                                    <MenuItem value={1}>1</MenuItem>
                                    <MenuItem value={4}>4</MenuItem>
                                </Select>
                                <FormHelperText>RFC4122 version</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item md={1} sm={2} xs={3}>
                            <FormControl className={classes.formControl}>
                                <TextField id="quantity" label="Quantity" value={quantity}
                                    onChange={(e) => setQuantity(+e.target.value)} type="number" />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </form>

            <Toolbar className={classes.toolbar}>
                <Box display='flex' flexGrow={1}></Box>
                <Button endIcon={<AssignmentTurnedIn>Copy</AssignmentTurnedIn>}
                    variant="contained" color="primary" onClick={handleCopy}>Copy</Button>
                <Button variant="contained" color="primary" endIcon={<SimCardIcon>Generate</SimCardIcon>}
                    onClick={() => setGenerated(services.generate(version, quantity))}>Generate</Button>
            </Toolbar>

            <div className={classes.formatted}>
                <pre>{generated}</pre>
            </div>
        </div>
    );
}

export default UUIDGenerator;
