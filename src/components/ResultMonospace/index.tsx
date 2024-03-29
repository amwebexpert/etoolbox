import React from 'react';

import { TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  result: {
    fontFamily: 'monospace',
    height: 'auto',
  },
}));

type Props = {
  label?: string;
  testID?: string;
  result?: string;
  rows?: number;
  maxRows?: number;
};

export const ResultMonospace: React.FC<Props> = ({ label, testID, result, rows = 10, maxRows = 15 }) => {
  const classes = useStyles();

  return (
    <TextField
      multiline={true}
      data-testid={testID}
      minRows={rows}
      maxRows={maxRows}
      label={label}
      variant="outlined"
      margin="normal"
      fullWidth={true}
      value={result}
      InputProps={{
        classes: {
          input: classes.result,
        },
      }}
    />
  );
};

export default ResultMonospace;
