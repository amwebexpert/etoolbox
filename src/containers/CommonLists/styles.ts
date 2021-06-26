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
    tabsPanel: {
        flexGrow: 1,
        width: '100%',
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
    },
    tabsBar: {
        marginBottom: theme.spacing(2),
    },
    tableHeader: {
        backgroundColor: theme.palette.primary.main,
    },
}));
