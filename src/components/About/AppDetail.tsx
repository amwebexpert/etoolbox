import React from 'react';

import GithubIcon from '@mui/icons-material/GitHub';
import PrivacyIcon from '@mui/icons-material/Security';
import { Link } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer, { TableContainerProps } from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { withStyles } from '@mui/styles';

import { APP_VERSION_INFO, LONG_VERSION_DATE } from '../../constants';
import { getBuildUTCTimestamp } from '../../services/utils';
import { useIsWidthUp } from '../../theme';
import { useToasterUpdate } from '../Toaster/ToasterProvider';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const AppDetail: React.FC<TableContainerProps> = ({ ...otherProps }) => {
  const { setToasterState } = useToasterUpdate();
  const isMdUp = useIsWidthUp('md');

  function onBuildDateClick() {
    const message = `Build UTC timestamp: [${getBuildUTCTimestamp()}]`;
    setToasterState({ open: true, message, type: 'info' });
  }

  return (
    <TableContainer component={Paper} {...otherProps}>
      <Table size={isMdUp ? 'medium' : 'small'} aria-label='about this application'>
        <TableBody>
          <StyledTableRow key='github'>
            <StyledTableCell component='th' scope='row'>
              <GithubIcon />
            </StyledTableCell>
            <StyledTableCell align='right'>
              <Link href='https://github.com/amwebexpert/etoolbox'>GitHub project</Link>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key='privacy'>
            <StyledTableCell component='th' scope='row'>
              <PrivacyIcon />
            </StyledTableCell>
            <StyledTableCell align='right'>
              <Link
                target='_blank'
                rel='noopener noreferrer'
                href='https://amwebexpert.github.io/etoolbox/privacy-policy.html'
              >
                Privacy Policy
              </Link>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key='versionNumber'>
            <StyledTableCell component='th' scope='row'>
              Version
            </StyledTableCell>
            <StyledTableCell align='right'>{APP_VERSION_INFO.VERSION}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key='versionDate'>
            <StyledTableCell component='th' scope='row'>
              Updated
            </StyledTableCell>
            <StyledTableCell align='right' title={LONG_VERSION_DATE} onClick={onBuildDateClick}>
              {APP_VERSION_INFO.VERSION_DATE}
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key='author'>
            <StyledTableCell component='th' scope='row'>
              Author
            </StyledTableCell>
            <StyledTableCell align='right'>
              <Link href='mailto:amwebexpert@gmail.com'>André Masson</Link>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key='iconMadeBy'>
            <StyledTableCell component='th' scope='row'>
              Icon credits
            </StyledTableCell>
            <StyledTableCell align='right'>
              <Link href='https://therealjerrylow.com/'>Jerry Low</Link>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key='reactVersiion'>
            <StyledTableCell component='th' scope='row'>
              React Version
            </StyledTableCell>
            <StyledTableCell align='right'>{React.version}</StyledTableCell>
          </StyledTableRow>
          <StyledTableRow key='poweredByCRA'>
            <StyledTableCell component='th' scope='row'>
              Open source powered by
            </StyledTableCell>
            <StyledTableCell align='right'>
              <Link href='https://reactjs.org/docs/create-a-new-react-app.html'>Create React App</Link>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppDetail;
