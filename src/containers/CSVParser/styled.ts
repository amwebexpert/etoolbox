import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    fileSelector: {
        margin: theme.spacing(2),
        textAlign: 'center',
    },
    formControl: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        minWidth: 120,
    },
    inputField: {
        fontFamily: 'monospace',
        fontSize: '0.8em',
        whiteSpace: 'nowrap',
        overflowY: 'scroll',
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
    encodedResult: {
        padding: theme.spacing(1),
        borderColor: theme.palette.text.disabled,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
        whiteSpace: 'normal',
        wordBreak: 'break-word',
    },
}));
