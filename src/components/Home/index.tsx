import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  withStyles,
  withWidth,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/core/styles';
import {Breakpoint} from '@material-ui/core/styles/createBreakpoints';
import {Alert, AlertTitle} from '@material-ui/lab';
import React, {useState} from 'react';
import {getBuildUTCDate} from '../../services/utils';
import PressableCounter from './PressableCounter';
import {CHANGE_LOGS} from './services';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  panelTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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

interface Props {
  width: Breakpoint;
}

const isDebugClassComponent = false;

const Home: React.FC<Props> = (props: Props) => {
  const classes = useStyles();

  const [isDebugComponentVisible, setIsDebugComponentVisible] = useState<boolean>(false);
  const toggleDebugClassComponent = () => setIsDebugComponentVisible(value => !value);

  return (
    <Paper className={classes.root}>

      {isDebugClassComponent && (
        <div className={classes.panelTitle}>
          <Button variant="contained" color="primary" onClick={toggleDebugClassComponent}>
            Toggle debug class component
          </Button>

          {isDebugComponentVisible && <PressableCounter initialCounterValue={10} onDispose={toggleDebugClassComponent} />}
        </div>
      )}

      <Alert severity="success">
        <AlertTitle>Last build: {getBuildUTCDate()}</AlertTitle>
        <Typography variant="body1">
          Welcome to a collection of web developer utilities packaged as a desktop app!
        </Typography>
      </Alert>

      <Typography variant="h6" className={classes.panelTitle}>
        Change Logs
      </Typography>

      <TableContainer component={Paper}>
        <Table aria-label="Changes log">
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

export default withWidth()(Home);
