import React from 'react';

import { Typography } from '@mui/material';

import { SPACE } from '../../constants';
import { useStyles } from './styles';

type Props = {
  searching: boolean;
  count: number;
};

const FILTERING = 'filtering…';

const FilterStats: React.FC<Props> = ({ count, searching }) => {
  const classes = useStyles();
  const [working, setWorking] = React.useState(SPACE);

  React.useEffect(() => {
    if (searching) {
      setWorking(FILTERING);
    } else {
      setTimeout(() => setWorking(SPACE), 800);
    }
  }, [searching]);

  return (
    <div className={classes.root}>
      <Typography align="right">{working}</Typography>
      <Typography align="right">{count}</Typography>
    </div>
  );
};

export default FilterStats;
