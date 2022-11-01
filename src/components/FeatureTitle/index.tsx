import React, { ElementType } from 'react';

import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  title: {
    wordBreak: 'break-word',
  },
  titleWithIcon: {
    display: 'flex',
    alignItems: 'center',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  icon: {
    height: '40px',
    width: '40px',
    marginRight: theme.spacing(1),
  },
}));

interface Props {
  title: string;
  iconType: ElementType;
}

const FeatureTitle: React.FC<Props> = ({ title, iconType: FeatureIcon }) => {
  const classes = useStyles();

  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleWithIcon}>
        <FeatureIcon className={classes.icon} />
        <Typography variant="h5" className={classes.title}>
          {title}
        </Typography>
      </div>
    </div>
  );
};

export default FeatureTitle;
