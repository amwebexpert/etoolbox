import { TableCell, TableRow } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';

export const StyledTableCell = withStyles(theme => ({
  body: {
    fontSize: theme.spacing(1.75),
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
}))(TableCell);

export const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(even)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  panel: {
    marginBottom: theme.spacing(3),
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
  },
}));
