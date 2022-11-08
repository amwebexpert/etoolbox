import React from 'react';

import { Alert, AlertTitle } from '@mui/material';
import { Box, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles, withStyles } from '@mui/styles';

import { getBuildUTCDate } from '../../services/utils';
import { CHANGE_LOGS } from './services';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  panel: {
    borderColor: theme.palette.text.disabled,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: theme.shape.borderRadius,
    width: '100%',
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Alert severity="success">
        <AlertTitle>Last build: {getBuildUTCDate()}</AlertTitle>
        <Typography variant="body1">
          Welcome to a collection of web developer utilities packaged as a desktop app!
        </Typography>
      </Alert>

      <Box sx={{ mt: 3, mb: 3 }}>
        <Typography variant="h6">Change Logs</Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table aria-label="Change logs">
          <TableBody>
            {CHANGE_LOGS.map((changeLog, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{changeLog.version}</StyledTableCell>
                <StyledTableCell>{changeLog.desc}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Home;
