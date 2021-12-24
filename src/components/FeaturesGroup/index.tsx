import { Tab, Tabs } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link, Route, Routes, useLocation, useResolvedPath } from 'react-router-dom';


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
  type: any;
  path: string;
  label: string;
};

export type Props = {
  tabs: FeatureGroupTab[];
};

const FeaturesGroup = ({tabs}: Props) => {
  const classes = useStyles();
  const parentPath = useResolvedPath('').pathname;
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    // Because of the following issue, Suspense is breaking the tab selection (fix will be part of React 18)
    // https://github.com/mui-org/material-ui/issues/14077
    const tabIndex = tabs.findIndex(tab => `${parentPath}${tab.path}` === location.pathname);
    setValue(tabIndex === -1 ? 0 : tabIndex);
  }, [location, setValue, parentPath, tabs]);
  const FirstTab = tabs[0].type;

  return (
    <>
      <Paper square className={classes.root}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
          onChange={(_e: unknown, newValue: number) => setValue(newValue)}>
          {tabs.map((tab, i) => (
            <Tab value={i} key={i} label={tab.label} to={`${parentPath}${tab.path}`} component={Link} />
          ))}
        </Tabs>
      </Paper>

      <Routes>
        {tabs.map(tab => {
          const VisualComponent = tab.type;
          console.log('Preparing component path', `${parentPath}${tab.path}`);
          return (
            <Route key={tab.path} path={`${parentPath}${tab.path}`} element={<VisualComponent />} />
          );
        })}

        {/** Default route is the 1st one */}
        <Route path={`${parentPath}`} element={<FirstTab />} />
      </Routes>
    </>
  );
};

export default FeaturesGroup;
