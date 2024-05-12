import React from 'react';

import LinkIcon from '@mui/icons-material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { SetTextInputAction, setTextAction } from '../../actions/text-actions';
import { FeatureScreen } from '../../components/FeatureScreen/FeatureScreen';
import { AppState } from '../../reducers';
import { useIsWidthUp } from '../../theme';
import * as services from './services';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

type Props = {
  inputText?: string;
  storeInputText: (name: string, value: string) => void;
};

const URLParser: React.FC<Props> = ({ inputText, storeInputText }) => {
  const title = 'URL Parser';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const [urlFragments, setUrlFragments] = React.useState(new Map());
  const [urlParams, setUrlParams] = React.useState(new Map());

  React.useEffect(() => {
    setUrlFragments(services.parseUrl(inputText));
    setUrlParams(services.parseUrlParams(inputText));
  }, [inputText]);

  return (
    <FeatureScreen iconType={LinkIcon} title={title}>
      <TextField
        autoFocus={isMdUp}
        label='URL'
        placeholder='Paste or type the url here'
        multiline={true}
        minRows={4}
        maxRows={isMdUp ? 20 : 4}
        variant='outlined'
        margin='normal'
        fullWidth={true}
        value={inputText}
        className={classes.panel}
        onChange={(e) => storeInputText('lastUrlParserValue', e.target.value)}
      />

      <TableContainer component={Paper} className={classes.panel}>
        <Table size={isMdUp ? 'medium' : 'small'}>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <StyledTableCell>Fragment</StyledTableCell>
              <StyledTableCell>Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...urlFragments.keys()].sort().map((key) => (
              <StyledTableRow key={key}>
                <StyledTableCell component='th' scope='row'>
                  {key}
                </StyledTableCell>
                <StyledTableCell>{urlFragments.get(key)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer component={Paper}>
        <Table size={isMdUp ? 'medium' : 'small'}>
          <TableHead className={classes.tableHeader}>
            <TableRow>
              <StyledTableCell>Parameter</StyledTableCell>
              <StyledTableCell>Value</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...urlParams.keys()].sort().map((key) => (
              <StyledTableRow key={key}>
                <StyledTableCell component='th' scope='row'>
                  {key}
                </StyledTableCell>
                <StyledTableCell>{urlParams.get(key)}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FeatureScreen>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastUrlParserValue'],
  };
}

export function mapDispatchToProps(dispatch: Dispatch<SetTextInputAction>) {
  return {
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(URLParser);
