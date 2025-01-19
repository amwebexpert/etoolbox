import React from 'react';

import { Alert, AlertTitle, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';

import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { APP_VERSION_INFO, CHANGELOG_MD } from '../../app-version-constants';
import { getBuildUTCDate } from '../../services/utils';
import { MarkdownLink } from './markdown-link';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
}));

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Alert severity='info'>
        <AlertTitle>Last build: {getBuildUTCDate()}</AlertTitle>

        <Typography variant='body1'>{APP_VERSION_INFO.DESCRIPTION}</Typography>
      </Alert>

      <TableContainer>
        <Table aria-label='Change logs'>
          <TableBody>
            <TableRow>
              <TableCell>
                <Markdown remarkPlugins={[remarkGfm]} components={{ a: MarkdownLink }}>
                  {CHANGELOG_MD}
                </Markdown>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default Home;
