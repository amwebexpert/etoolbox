import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .spinner_overlay': {
            background: 'rgba(0, 0, 0, 0.3)',
        },
    },
}));

interface Props {
    active: boolean;
    children: any;
}

export const Spinner: React.FC<Props> = (props: Props) => {
    const classes = useStyles();

    return (
        <LoadingOverlay classNamePrefix='spinner_' className={classes.root}
            active={props.active} spinner={<ScaleLoader color="#bf3a2b" />}>
            {props.children}
        </LoadingOverlay>
    );
}
