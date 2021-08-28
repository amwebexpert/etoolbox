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
        marginBottom: theme.spacing(3),
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    value: {
        fontFamily: 'monospace',
    },
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    timePickerField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 260,
    },
}));
