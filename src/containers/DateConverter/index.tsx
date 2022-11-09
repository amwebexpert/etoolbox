import React, { useEffect, useState } from 'react';

import EventIcon from '@mui/icons-material/Event';
import TimerIcon from '@mui/icons-material/Timer';
import { Box, Button, FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { DatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { setTextAction } from '../../actions/text-actions';
import { FeatureScreen } from '../../components/FeatureScreen/FeatureScreen';
import { AppState } from '../../reducers';
import { useIsWidthDown, useIsWidthUp } from '../../theme';
import { CardLayout } from './CardLayout';
import { useStyles } from './styles';
import { TableLayout } from './TableLayout';

type Props = {
  inputText?: string;
  storeInputText: (name: string, value: string) => void;
};

const DateConverter: React.FC<Props> = ({ inputText, storeInputText }) => {
  const title = 'Date & Epoch';
  const classes = useStyles();
  const [date, setDate] = useState<Date | null>(null);
  const isMdUp = useIsWidthUp('md');
  const isMdDown = useIsWidthDown('md');

  const handleDateChange = (date: Date | null) => {
    setDate(date);
    if (date) {
      storeInputText('lastEpochValue', `${date.getTime()}`);
    }
  };

  useEffect(() => {
    if (inputText) {
      setDate(new Date(+inputText));
    }
  }, [inputText]);

  return (
    <FeatureScreen iconType={EventIcon} title={title}>
      <form className={classes.form} noValidate>
        <Grid container justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <FormControl className={classes.formControl}>
              <TextField
                autoFocus={isMdUp}
                label="Epoch value"
                placeholder="Epoch value"
                type="number"
                variant="outlined"
                value={inputText}
                onChange={e => storeInputText('lastEpochValue', e.target.value)}
              />
            </FormControl>
            <Button
              variant="contained"
              title="Update value with 'Now' timestamp"
              color="primary"
              onClick={() => handleDateChange(new Date())}>
              <TimerIcon />
            </Button>
          </Box>
          <Box display="flex" alignItems="center">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <FormControl className={classes.formControl}>
                <DatePicker
                  label="Date"
                  inputFormat="yyyy-MM-dd"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={props => <TextField {...props} />}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <TimePicker
                  label="Time"
                  inputFormat="HH:mm:ss"
                  value={date}
                  onChange={handleDateChange}
                  renderInput={props => <TextField {...props} />}
                />
              </FormControl>
            </LocalizationProvider>
          </Box>
        </Grid>
      </form>

      {isMdDown && <CardLayout date={date} epochString={inputText} />}

      {isMdUp && <TableLayout date={date} epochString={inputText} />}
    </FeatureScreen>
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

export default connect(mapStateToProps, mapDispatchToProps)(DateConverter);
