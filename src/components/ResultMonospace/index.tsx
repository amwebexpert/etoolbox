import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    result: {
        fontFamily: 'monospace',
        height: 'auto',
    },
}));

interface Props {
    label?: string;
    result?: string;
    rows?: number;
    maxRows?: number;
}

export const ResultMonospace = ({ label, result, rows = 10, maxRows = 15 }: Props) => {
    const classes = useStyles();

    return (
        <TextField
            multiline
            minRows={rows}
            maxRows={maxRows}
            label={label}
            variant='outlined'
            margin='normal'
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
