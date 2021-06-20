import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
}));

export const FullCenteredContent: React.FC = ({ children }: { children?: React.ReactNode }) => {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            {children}
        </div>
    );
}
