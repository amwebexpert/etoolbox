import { makeStyles } from "@material-ui/core";

export const imageResizer = {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid 1px blue'
};

export const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        flexGrow: 1,
    },
    header: {
        padding: '20px 0'
    },
    dropzone: {
        flex: '1',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
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
