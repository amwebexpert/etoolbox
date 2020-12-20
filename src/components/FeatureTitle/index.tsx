import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    icon: {
        height: '40px',
        width: '40px',
        marginRight: theme.spacing(1),
    },
}));

interface Props {
    title: string;
    iconType: any;
}

const FeatureTitle: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const FeatureIcon = props.iconType;

    return (
        <Grid container direction="row" alignItems="center">
            <FeatureIcon className={classes.icon} /> <Typography variant="h5">{props.title}</Typography>
        </Grid>
    );
}

export default FeatureTitle;
