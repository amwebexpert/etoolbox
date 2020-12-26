import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import LinkIcon from '@material-ui/icons/Link';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import * as services from './services';
import FeatureTitle from '../../components/FeatureTitle';

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

interface Props {
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
    width: Breakpoint;
}

const URLParser: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { inputText, storeInputText } = props;
    const [urlFragments, setUrlFragments] = React.useState(services.parseUrl(inputText));

    React.useEffect(() => {
        setUrlFragments(services.parseUrl(inputText));
    }, [inputText]);

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={LinkIcon} title="URL Parser" />

            <form noValidate autoComplete="off">
                <div>
                    <TextField
                        autoFocus={isWidthUp('md', props.width)}
                        id="outlined-multiline-static"
                        label="URL"
                        placeholder="Paste or type the url here"
                        multiline
                        rows={4}
                        variant="outlined"
                        margin="normal"
                        fullWidth={true}
                        value={inputText}
                        onChange={(e) => storeInputText('lastUrlParserValue', e.target.value)}
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

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs.map.get('lastUrlParserValue')
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(URLParser));
