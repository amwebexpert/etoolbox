import React from 'react';

import WaitIcon from '@mui/icons-material/HourglassEmpty';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { FullCenteredContent } from '../FullCenteredContent/FullCenteredContent';

const useStyles = makeStyles(() => ({
  titleWithIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

type Props = {
  title?: string;
};

export const LoadingContent: React.FC<Props> = ({ title = 'Loading…' }) => {
  const classes = useStyles();

  return (
    <FullCenteredContent>
      <div className={classes.titleWithIcon}>
        <WaitIcon width={40} height={40} sx={{ mr: 1 }} />
        <Typography variant="body1" align="center">
          {title}
        </Typography>
      </div>
    </FullCenteredContent>
  );
};
