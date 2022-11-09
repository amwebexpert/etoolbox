import { TableCell, TableRow } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';

export const StyledTableCell = withStyles(() => ({
  body: {
    fontSize: 14,
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
  toolbar: {
    height: '100%',
    margin: 0,
    padding: 0,
    '& > *': {
      marginLeft: theme.spacing(1),
    },
  },
  formControl: {
    marginRight: theme.spacing(1),
  },
  submitEstimate: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  teamEstimates: {
    marginTop: theme.spacing(4),
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
  },
}));
