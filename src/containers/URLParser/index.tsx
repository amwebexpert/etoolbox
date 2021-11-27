import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
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
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import { Helmet } from 'react-helmet';

interface Props {
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
    width: Breakpoint;
}

const URLParser: React.FC<Props> = (props: Props) => {
    const title = 'URL Parser';
    const classes = useStyles();
    const { inputText, storeInputText } = props;
    const [urlFragments, setUrlFragments] = React.useState(new Map());
    const [urlParams, setUrlParams] = React.useState(new Map());

    React.useEffect(() => {
        setUrlFragments(services.parseUrl(inputText));
        setUrlParams(services.parseUrlParams(inputText));
    }, [inputText]);

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={LinkIcon} title={title} />

                <TextField
                    autoFocus={isWidthUp('md', props.width)}
                    label="URL"
                    placeholder="Paste or type the url here"
                    multiline
                    minRows={4}
                    maxRows={isWidthUp('md', props.width) ? 20 : 4}
                    variant="outlined"
                    margin="normal"
                    fullWidth={true}
                    value={inputText}
                    className={classes.panel}
                    onChange={(e) => storeInputText('lastUrlParserValue', e.target.value)}
                />

                <TableContainer component={Paper} className={classes.panel}>
                    <Table size={isWidthUp('md', props.width) ? 'medium' : 'small'}>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <StyledTableCell>Fragment</StyledTableCell>
                                <StyledTableCell>Value</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...urlFragments.keys()].sort().map(key => (
                                <StyledTableRow key={key}>
                                    <StyledTableCell component="th" scope="row">{key}</StyledTableCell>
                                    <StyledTableCell>{urlFragments.get(key)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <TableContainer component={Paper}>
                    <Table size={isWidthUp('md', props.width) ? 'medium' : 'small'}>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <StyledTableCell>Parameter</StyledTableCell>
                                <StyledTableCell>Value</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {[...urlParams.keys()].sort().map(key => (
                                <StyledTableRow key={key}>
                                    <StyledTableCell component="th" scope="row">{key}</StyledTableCell>
                                    <StyledTableCell>{urlParams.get(key)}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastUrlParserValue'],
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(URLParser));
