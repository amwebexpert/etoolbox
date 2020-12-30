import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    form: {
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    cardContent: {
        minHeight: 50,
        minWidth: 50,
        maxWidth: 100,
        maxHeight: 100,
        margin: 20
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
    formatted: {
        padding: theme.spacing(1),
        border: '1px solid grey',
        wordWrap: 'break-word',
        height: 116,
    },
}));
