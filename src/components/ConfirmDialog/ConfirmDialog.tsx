import React, { PropsWithChildren } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
                    color="default">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};