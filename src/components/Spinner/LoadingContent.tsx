import React from 'react';

import WaitIcon from '@mui/icons-material/HourglassBottom';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { FullCenteredContent } from '../FullCenteredContent/FullCenteredContent';

const useStyles = makeStyles(theme => ({
  titleWithIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: '40px',
    width: '40px',
    marginRight: theme.spacing(1),
  },
}));

export const LoadingContent: React.FC = () => {
  const classes = useStyles();

  return (
    <FullCenteredContent>
      <div className={classes.titleWithIcon}>
        <WaitIcon className={classes.icon} />
        <Typography variant="body1" align="center">
          Loading…
        </Typography>
      </div>
    </FullCenteredContent>
  );
};
