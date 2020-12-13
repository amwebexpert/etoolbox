import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
}));

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


const URLParser: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState('http://www.upwave.com');
    const [parts, setParts] = React.useState(new Map<string, string>());

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        setValue(newValue);
        try {
            const newUrl = new URL(newValue);
            const parts: Map<string, string> = new Map();
            parts.set('host', newUrl.host);
            parts.set('protocol', newUrl.protocol);

            setParts(parts);
        } catch (e) {
            //  do nothing user may still be typing }
        }
    }

    return (
        <div className={classes.root}>
            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        id="outlined-multiline-static"
                        label="URL"
                        placeholder="Paste or type the url here"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        value={value}
                        onChange={handleChange}
                    />
                </div>
            </form>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Attribute</StyledTableCell>
                            <StyledTableCell>Value</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {parts && [...parts.keys()].map(key => (
                            <StyledTableRow key={key}>
                                <StyledTableCell component="th" scope="row">{key}</StyledTableCell>
                                <StyledTableCell>{parts.get(key)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default URLParser;
