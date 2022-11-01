import React from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import { FormControlLabel, Switch } from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet';

import FeatureTitle from '../../components/FeatureTitle';
import { usePreferenceTheme } from '../../components/Preferences/PreferencesProvider';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
  topDivider: {
    marginBottom: theme.spacing(8),
  },
  switch: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
}));

const AppPreferences: React.FC = () => {
  const classes = useStyles();
  const { isDark, toggleTheme } = usePreferenceTheme();
  const title = 'Application preferences';

  return (
    <>
      <Helmet title={title} />
      <Paper className={classes.root}>
        <FeatureTitle iconType={SettingsIcon} title={title} />

        <div className={classes.topDivider} />

        <div className={classes.switch}>
          <FormControlLabel
            control={<Switch checked={isDark} onChange={() => toggleTheme()} />}
            label="Activate the Dark theme mode"
            labelPlacement="end"
          />
        </div>
      </Paper>
    </>
  );
};

export default AppPreferences;
