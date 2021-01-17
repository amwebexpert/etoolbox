import React from "react";

import LoadingOverlay from 'react-loading-overlay';
import ScaleLoader from 'react-spinners/ScaleLoader';

import { useGlobalSpinner } from "./GlobalSpinnerProvider";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        '& .globalSpinner_overlay': {
            height: '100vh',
            zIndex: theme.zIndex.drawer + 2,
        },
    },
}));

export const GlobalSpinner: React.FC = ({ children }) => {
    const classes = useStyles();
    const { globalSpinnerState } = useGlobalSpinner();

    return (
        <LoadingOverlay classNamePrefix='globalSpinner_' className={classes.root} 
            spinner={<ScaleLoader />} active={globalSpinnerState.open}>
            {children}
        </LoadingOverlay>
    );
}
