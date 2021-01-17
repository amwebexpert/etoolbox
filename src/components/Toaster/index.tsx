import React from "react";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import { useToaster, useToasterUpdate } from "./ToasterProvider";

export const Toaster: React.FC = () => {
    const { toasterState } = useToaster();
    const { setToasterState } = useToasterUpdate();

    const handleClose = () => {
        setToasterState({ ...toasterState, open: false });
    };

    return (
        <Snackbar
            open={toasterState.open}
            autoHideDuration={toasterState.autoHideDuration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
            <Alert
                elevation={6}
                variant="filled"
                onClose={handleClose}
                severity={toasterState.type}
            >
                {toasterState.message}
            </Alert>
        </Snackbar>
    );
}
