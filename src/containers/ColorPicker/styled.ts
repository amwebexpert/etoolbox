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
    image: {
        width: '100%',
        margin: 5,
        border: 'dashed 1px grey'
    },
    imageSelector: {
        margin: theme.spacing(2),
        textAlign: 'center',
    },
    toolbar: {
        margin: theme.spacing(2),
    },
    sample: {
        width: '50%',
        height: 100,
        marginTop: 20,
        marginBottom: 20,
        paddingTop: 30,
        borderColor: theme.palette.text.disabled,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'monospace',
        textShadow: '1px 1px lightgrey',
    },
}));
