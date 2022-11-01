import React from 'react';

import GithubIcon from '@mui/icons-material/GitHub';
import PrivacyIcon from '@mui/icons-material/Security';
import { Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { withStyles } from '@mui/styles';

import { getBuildUTCDate, getBuildUTCTimestamp } from '../../services/utils';
import { useIsWidthUp } from '../../theme';
import { useToasterUpdate } from '../Toaster/ToasterProvider';

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

const AppDetail: React.FC = () => {
  const { setToasterState } = useToasterUpdate();
  const isMdUp = useIsWidthUp('md');

  function onBuildDateClick() {
    const message = `Build UTC timestamp: [${getBuildUTCTimestamp()}]`;
    setToasterState({ open: true, message, type: 'info' });
  }

  return (
    <TableContainer component={Paper}>
      <Table size={isMdUp ? 'medium' : 'small'} aria-label="about this application">
        <TableBody>
          <StyledTableRow key="github">
            <StyledTableCell component="th" scope="row">
              <GithubIcon />
            </StyledTableCell>
            <StyledTableCell align="right">
              <Link href="https://github.com/amwebexpert/etoolbox">GitHub project</Link>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key="privacy">
            <StyledTableCell component="th" scope="row">
              <PrivacyIcon />
            </StyledTableCell>
            <StyledTableCell align="right">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://amwebexpert.github.io/etoolbox/privacy-policy.html">
                Privacy Policy
              </Link>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key="versionNumber">
            <StyledTableCell component="th" scope="row">
              Version
            </StyledTableCell>
            <StyledTableCell align="right">{process.env.REACT_APP_VERSION}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key="versionDate">
            <StyledTableCell component="th" scope="row">
              Updated
            </StyledTableCell>
            <StyledTableCell align="right" title={getBuildUTCTimestamp()} onClick={onBuildDateClick}>
              {getBuildUTCDate()}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key="author">
            <StyledTableCell component="th" scope="row">
              Author
            </StyledTableCell>
            <StyledTableCell align="right">
              <Link href="mailto:amwebexpert@gmail.com">amwebexpert@gmail.com</Link>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key="iconMadeBy">
            <StyledTableCell component="th" scope="row">
              Icon credits
            </StyledTableCell>
            <StyledTableCell align="right">
              <Link href="https://therealjerrylow.com/">Jerry Low</Link>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key="reactVersiion">
            <StyledTableCell component="th" scope="row">
              React Version
            </StyledTableCell>
            <StyledTableCell align="right">{React.version}</StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppDetail;
