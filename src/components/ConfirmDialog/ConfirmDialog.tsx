import React, { PropsWithChildren } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

type ConfirmDialogProps = PropsWithChildren<{
    title: React.ReactNode;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    onConfirm: () => void;
}>;

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ title, children, isOpen, setIsOpen, onConfirm }) => {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} aria-labelledby="confirm-dialog">
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="text" onClick={() => setIsOpen(false)} color="secondary">
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setIsOpen(false);
                        onConfirm();
                    }}
                    color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};
