import React, { PropsWithChildren } from 'react';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
}));

type FullCenteredContentType = PropsWithChildren<unknown>;

export const FullCenteredContent: React.FC<FullCenteredContentType> = ({ children }) => {
  const classes = useStyles();

  return <div className={classes.content}>{children}</div>;
};
