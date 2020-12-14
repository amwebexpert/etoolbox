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
import * as services from './services';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
}));

const StyledTableCell = withStyles(() => ({
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

const DEFAULT_URL = 'http://www.upwave.com:8080/test/this?test=34&test2=this+is+my+second+param#value-added-to-url';

const URLParser: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(DEFAULT_URL);
    const [urlFragments, setUrlFragments] = React.useState(services.parseUrl(DEFAULT_URL));

    const handleChange = (event: any) => {
        const url = event.target.value;
        setValue(url);
        setUrlFragments(services.parseUrl(url));
    }

    return (
        <div className={classes.root}>
            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        autoFocus
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
                            <StyledTableCell>Fragment</StyledTableCell>
                            <StyledTableCell>Value</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {urlFragments && [...urlFragments.keys()].sort().map(key => (
                            <StyledTableRow key={key}>
                                <StyledTableCell component="th" scope="row">{key}</StyledTableCell>
                                <StyledTableCell>{urlFragments.get(key)}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default URLParser;
