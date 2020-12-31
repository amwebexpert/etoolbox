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
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
}));
