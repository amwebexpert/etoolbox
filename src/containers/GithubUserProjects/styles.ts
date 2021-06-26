import { makeStyles, TableCell, TableRow, withStyles } from "@material-ui/core";

export const StyledTableCell = withStyles(() => ({
    body: {
        fontSize: 14,
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
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
    },
    dateColumn: {
        textAlign: 'center',
        minWidth: 120,
    },
    watchColumn: {
        textAlign: 'center',
    },
}));
