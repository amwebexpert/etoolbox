import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';


const useStyles = makeStyles((theme) => ({
    title: {
        wordBreak: 'break-word',
    },
    titleWithIcon: {
        display: 'flex',
        alignItems: 'center',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'center',
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
        <div className={classes.titleContainer}>
            <div className={classes.titleWithIcon}>
                <FeatureIcon className={classes.icon} />
                <Typography variant="h5" className={classes.title}>
                    {props.title}
                </Typography>
            </div>
        </div>
    );
}

export default FeatureTitle;
