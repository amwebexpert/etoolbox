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
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
    sample: {
        width: '80%',
        height: 40,
        paddingTop: 10,
        marginBottom: 20,
        border: 'solid 1px grey',
        textAlign: 'center',
        textShadow: '1px 1px lightgrey',
    },
}));
