import React from 'react';

import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';

import CopyButton from '../../components/CopyButton';
import { useSyntaxHighlightTheme } from '../../hooks/useSyntaxHighlightTheme';
import { useIsWidthUp } from '../../theme';
import { SAMPLE_DATEFNS_FORMAT, SAMPLE_DATEFNS_TZ_CONVERT } from './constants';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

type Props = {
  date: Date | null;
  epochString?: string;
};

export const TableLayout: React.FC<Props> = ({ date, epochString }) => {
  const classes = useStyles();
  const syntaxTheme = useSyntaxHighlightTheme();
  const isMdUp = useIsWidthUp('md');

  return (
    <TableContainer component={Paper} className={classes.panel}>
      <Table size={isMdUp ? 'medium' : 'small'}>
        <TableHead className={classes.tableHeader}>
          <TableRow>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Value and js code examples using date-fns library</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              ISO string / JSON
            </StyledTableCell>
            <StyledTableCell>
              <span className={classes.value}>{date?.toISOString()}</span>
            </StyledTableCell>
            <StyledTableCell>
              <CopyButton data={date?.toISOString()} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Locale date string
            </StyledTableCell>
            <StyledTableCell>
              <span className={classes.value}>
                {date?.toLocaleDateString()} {date?.toLocaleTimeString()}
              </span>
            </StyledTableCell>
            <StyledTableCell>
              <CopyButton data={date?.toLocaleDateString() + ' ' + date?.toLocaleTimeString()} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Js code using epoch
            </StyledTableCell>
            <StyledTableCell>
              <span className={classes.value}>const dt = new Date({epochString});</span>
            </StyledTableCell>
            <StyledTableCell>
              <CopyButton data={`const dt = new Date(${epochString});`} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Js code using ISO 8601
            </StyledTableCell>
            <StyledTableCell>
              <span className={classes.value}>const dt = new Date('{date?.toISOString()}');</span>
            </StyledTableCell>
            <StyledTableCell>
              <CopyButton data={`const dt = new Date(${epochString});`} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              date-fns timezone convertion example
            </StyledTableCell>
            <StyledTableCell>
              <SyntaxHighlighter style={syntaxTheme} language="javascript" className={classes.formatted}>
                {SAMPLE_DATEFNS_TZ_CONVERT.replace('#utc_value#', date?.toISOString() ?? '')}
              </SyntaxHighlighter>
            </StyledTableCell>
            <StyledTableCell>
              <CopyButton data={SAMPLE_DATEFNS_TZ_CONVERT.replace('#utc_value#', date?.toISOString() ?? '')} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              Timezone offset
            </StyledTableCell>
            <StyledTableCell>
              {date?.getTimezoneOffset()} min ({(date?.getTimezoneOffset() ?? 0) / 60} hrs)
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              date-fns format example
            </StyledTableCell>
            <StyledTableCell>
              <SyntaxHighlighter style={syntaxTheme} language="javascript" className={classes.formatted}>
                {SAMPLE_DATEFNS_FORMAT.replace('#utc_value#', date?.toISOString() ?? '')}
              </SyntaxHighlighter>
            </StyledTableCell>
            <StyledTableCell>
              <CopyButton data={SAMPLE_DATEFNS_FORMAT.replace('#utc_value#', date?.toISOString() ?? '')} />
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell component="th" scope="row">
              UTC string
            </StyledTableCell>
            <StyledTableCell>{date?.toUTCString()}</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
