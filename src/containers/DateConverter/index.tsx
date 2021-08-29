import { Box, Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField from '@material-ui/core/TextField';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import EventIcon from '@material-ui/icons/Event';
import TimerIcon from '@material-ui/icons/Timer';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setTextAction } from '../../actions/text-actions';
import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import CopyButton from '../../components/CopyButton';
import { SAMPLE_DATEFNS_FORMAT, SAMPLE_DATEFNS_TZ_CONVERT } from './constants';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useSyntaxHighlightTheme } from '../../hooks/useSyntaxHighlightTheme';

interface Props {
    width: Breakpoint;
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
}

const DateConverter: React.FC<Props> = (props: Props) => {
    const title = 'Date & Epoch';
    const classes = useStyles();
    const syntaxTheme = useSyntaxHighlightTheme();
    const { inputText, storeInputText } = props;
    const [date, setDate] = useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setDate(date);
        storeInputText('lastEpochValue', `${date?.getTime()}`);
    };

    useEffect(() => {
        if (inputText) {
            setDate(new Date(+inputText));
        }
    }, [inputText]);

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={EventIcon} title={title} />

                <form className={classes.form} noValidate>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justifyContent='space-between'>
                            <Box display='flex' alignItems='center'>
                                <TextField
                                    autoFocus={isWidthUp('md', props.width)}
                                    label='Epoch value'
                                    placeholder='Epoch value'
                                    type='number'
                                    variant='outlined'
                                    margin='normal'
                                    value={inputText}
                                    onChange={(e) => storeInputText('lastEpochValue', e.target.value)}
                                />
                                <Button
                                    variant='contained'
                                    title="Update value with 'Now' value"
                                    color='primary'
                                    onClick={() => handleDateChange(new Date())}
                                >
                                    <TimerIcon />
                                </Button>
                            </Box>
                            <div>
                                <KeyboardDatePicker
                                    margin='normal'
                                    label='Date'
                                    format='yyyy-MM-dd'
                                    value={date}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardTimePicker
                                    margin='normal'
                                    label='Time'
                                    value={date}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change time',
                                    }}
                                />
                            </div>
                        </Grid>
                    </MuiPickersUtilsProvider>
                </form>

                <TableContainer component={Paper} className={classes.panel}>
                    <Table size={isWidthUp('md', props.width) ? 'medium' : 'small'}>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Value and js code examples using date-fns library</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
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
                                <StyledTableCell component='th' scope='row'>
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
                                <StyledTableCell component='th' scope='row'>
                                    Js code using epoch
                                </StyledTableCell>
                                <StyledTableCell>
                                    <span className={classes.value}>const dt = new Date({inputText});</span>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CopyButton data={`const dt = new Date(${inputText});`} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                    Js code using ISO 8601
                                </StyledTableCell>
                                <StyledTableCell>
                                    <span className={classes.value}>const dt = new Date('{date?.toISOString()}');</span>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CopyButton data={`const dt = new Date(${inputText});`} />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                    date-fns timezone convertion example
                                </StyledTableCell>
                                <StyledTableCell>
                                    <SyntaxHighlighter
                                        style={syntaxTheme}
                                        language='javascript'
                                        className={classes.formatted}
                                    >
                                        {SAMPLE_DATEFNS_TZ_CONVERT.replace('#utc_value#', date?.toISOString() ?? '')}
                                    </SyntaxHighlighter>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CopyButton
                                        data={SAMPLE_DATEFNS_TZ_CONVERT.replace(
                                            '#utc_value#',
                                            date?.toISOString() ?? ''
                                        )}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                    Timezone offset
                                </StyledTableCell>
                                <StyledTableCell>
                                    {date?.getTimezoneOffset()} min ({(date?.getTimezoneOffset() ?? 0) / 60} hrs)
                                </StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                    date-fns format example
                                </StyledTableCell>
                                <StyledTableCell>
                                    <SyntaxHighlighter
                                        style={syntaxTheme}
                                        language='javascript'
                                        className={classes.formatted}
                                    >
                                        {SAMPLE_DATEFNS_FORMAT.replace('#utc_value#', date?.toISOString() ?? '')}
                                    </SyntaxHighlighter>
                                </StyledTableCell>
                                <StyledTableCell>
                                    <CopyButton
                                        data={SAMPLE_DATEFNS_FORMAT.replace(
                                            '#utc_value#',
                                            date?.toISOString() ?? ''
                                        )}
                                    />
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                    UTC string
                                </StyledTableCell>
                                <StyledTableCell>{date?.toUTCString()}</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </StyledTableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs['lastEpochValue'],
    };
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(DateConverter));
