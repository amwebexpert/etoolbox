import { makeStyles } from '@material-ui/core';

export const imageResizer = {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px blue'
};

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
    image: {
        width: '100%',
    },
    imageSelector: {
        margin: theme.spacing(2),
        textAlign: 'center',
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
