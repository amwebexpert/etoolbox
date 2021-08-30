import DateFnsUtils from '@date-io/date-fns';
import { Box, Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import TextField from '@material-ui/core/TextField';
import withWidth, { isWidthDown, isWidthUp } from '@material-ui/core/withWidth';
import EventIcon from '@material-ui/icons/Event';
import TimerIcon from '@material-ui/icons/Timer';
import { KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setTextAction } from '../../actions/text-actions';
import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import { CardLayout } from './CardLayout';
import { useStyles } from './styles';
import { TableLayout } from './TableLayout';

interface Props {
    width: Breakpoint;
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
}

const DateConverter: React.FC<Props> = (props: Props) => {
    const title = 'Date & Epoch';
    const classes = useStyles();
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

                {isWidthDown('sm', props.width) && <CardLayout date={date} epochString={inputText} />}

                {isWidthUp('md', props.width) && (
                    <TableLayout date={date} epochString={inputText} width={props.width} />
                )}
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
