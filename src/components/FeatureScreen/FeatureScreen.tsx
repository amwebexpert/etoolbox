import React, { ElementType, PropsWithChildren } from 'react';

import { makeStyles } from '@mui/styles';
import { Helmet } from 'react-helmet';

import FeatureTitle from '../FeatureTitle';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}));

type Props = PropsWithChildren<{
  title: string;
  iconType: ElementType;
}>;

export const FeatureScreen: React.FC<Props> = ({ title, iconType, children }) => {
  const classes = useStyles();

  return (
    <>
      <Helmet titleTemplate="Web Toolbox - %s" defaultTitle="Web Toolbox" title={title} />

      <div className={classes.root}>
        <FeatureTitle iconType={iconType} title={title} />

        {children}
      </div>
    </>
  );
};
