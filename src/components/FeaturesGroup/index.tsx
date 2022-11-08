import React, { ElementType } from 'react';

import { Tab, Tabs } from '@mui/material';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import { Link, useLocation, useResolvedPath } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },
  linkActive: {
    color: theme.palette.info.dark,
    '& .MuiListItem-root': {
      backgroundColor: theme.palette.grey[300],
    },
  },
  linkMenu: {
    textDecoration: 'none',
    color: 'inherit',
  },
}));

type FeatureGroupTab = {
  type: ElementType;
  path: string;
  label: string;
};

export type Props = {
  tabs: FeatureGroupTab[];
};

const FeaturesGroup = ({ tabs }: Props) => {
  const classes = useStyles();
  const { pathname: parentPath } = useResolvedPath('');
  const location = useLocation();
  const [value, setValue] = React.useState<number>();

  // computing
  const isUnknownSelectedTab = value === undefined;
  const VisualComponent = tabs[value ?? 0]?.type;

  React.useEffect(() => {
    // keep tab selection in sync with the route
    const tabIndex = tabs.findIndex(tab => `${parentPath}${tab.path}` === location.pathname);
    setValue(tabIndex === -1 ? 0 : tabIndex);
  }, [location, setValue, parentPath, tabs]);

  if (isUnknownSelectedTab || !VisualComponent) {
    return null;
  }

  return (
    <>
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons={true}
          onChange={(_e: unknown, newValue: number) => setValue(newValue)}>
          {tabs.map((tab, i) => (
            <Tab value={i} key={i} label={tab.label} to={`${parentPath}${tab.path}`} component={Link} />
          ))}
        </Tabs>
      </Paper>

      <VisualComponent />
    </>
  );
};

export default FeaturesGroup;
