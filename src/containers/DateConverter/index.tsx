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

interface Props {
    width: Breakpoint;
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
}

const DateConverter: React.FC<Props> = (props: Props) => {
    const title = 'Date & Epoch';
    const classes = useStyles();
    const { inputText, storeInputText } = props;
    const [date, setDate] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
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
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                                <KeyboardTimePicker
                                    margin='normal'
                                    label='Time'
                                    value={selectedDate}
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
                    <Table>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell>Value</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                    ISO string / JSON
                                </StyledTableCell>
                                <StyledTableCell>
                                    <span className={classes.value}>{date.toISOString()}</span>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                    Locale date string
                                </StyledTableCell>
                                <StyledTableCell>
                                    <span className={classes.value}>
                                        {date.toLocaleDateString()} {date.toLocaleTimeString()}
                                    </span>
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                    Timezone offset
                                </StyledTableCell>
                                <StyledTableCell>
                                    {date.getTimezoneOffset()} minutes ({date.getTimezoneOffset() / 60} hours)
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>
                                <StyledTableCell component='th' scope='row'>
                                    UTC string
                                </StyledTableCell>
                                <StyledTableCell>{date.toUTCString()}</StyledTableCell>
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
