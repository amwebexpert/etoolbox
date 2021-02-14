import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    title: {
        wordBreak: 'break-word',
    },
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
            <div className={classes.icon}>
                <FeatureIcon /> 
            </div>
            <Typography variant="h5" className={classes.title}>
                {props.title}
            </Typography>
        </Grid>
    );
}

export default FeatureTitle;
