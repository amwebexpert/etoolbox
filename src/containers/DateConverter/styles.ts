import { makeStyles, TableCell, TableRow, withStyles } from '@material-ui/core';

export const StyledTableCell = withStyles((theme) => ({
    body: {
        fontSize: theme.spacing(1.75),
        whiteSpace: 'normal',
        wordBreak: 'break-word',
    },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

export const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    panel: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    value: {
        fontFamily: 'monospace',
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    timePickerField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 260,
    },
    formatted: {
        width: '100%',
        overflow: 'auto',
        padding: 0,
        margin: 0,
    },
    card: {
        marginBottom: theme.spacing(1),
    },
    otherSubtitle: {
        marginTop: theme.spacing(1),
    },
}));
