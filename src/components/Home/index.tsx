import React from 'react';

import { Alert, AlertTitle, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles, withStyles } from '@mui/styles';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CHANGELOG_MD } from '../../app-version-constants';
import { getBuildUTCDate } from '../../services/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const StyledTableCell = withStyles((theme) => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Alert severity='success'>
        <AlertTitle>Last build: {getBuildUTCDate()}</AlertTitle>

        <Typography variant='body1'>
          Welcome to a collection of web developer utilities packaged as a desktop app!
        </Typography>
      </Alert>

      <TableContainer>
        <Table aria-label='Change logs'>
          <TableBody>
            <TableRow>
              <StyledTableCell>
                <Markdown remarkPlugins={[remarkGfm]}>{CHANGELOG_MD}</Markdown>
              </StyledTableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Home;
