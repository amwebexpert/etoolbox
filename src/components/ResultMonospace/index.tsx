import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(1),
        borderColor: theme.palette.text.disabled,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: theme.shape.borderRadius,
        width: '100%',
        overflow: 'auto',
    },
}));

interface Props {
    result?: string;
}

export const ResultMonospace = ({ result = '' }: Props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <pre>{result}</pre>
        </div>
    );
};

export default ResultMonospace;
