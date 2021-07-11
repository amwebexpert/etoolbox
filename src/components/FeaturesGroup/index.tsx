import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs } from '@material-ui/core';

import { Link, Redirect, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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

const FeaturesGroup = ({ tabs }: Props) => {
    const classes = useStyles();
    const { path: parentPath } = useRouteMatch();
    const location = useLocation();
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        // https://github.com/mui-org/material-ui/issues/14077
        // Because of this issue, Suspense is breaking the tab selection (fix will be part of React 18)
        const tabIndex = tabs.findIndex(tab => `${parentPath}${tab.path}` === location.pathname);
        console.log('Found tabIndex', tabIndex, location.pathname);
        setValue(tabIndex === -1 ? 0 : tabIndex);
    }, [location, setValue, parentPath, tabs]);

    return (
        <>
            <Paper square className={classes.root}>
                <Tabs
                    value={value}
                    indicatorColor='primary'
                    textColor='primary'
                    variant='scrollable'
                    scrollButtons='on'
                    onChange={(_e: any, newValue: number) => setValue(newValue)}
                >
                    {tabs.map((tab, i) => (
                        <Tab value={i} key={i} label={tab.label} to={`${parentPath}${tab.path}`} component={Link} />
                    ))}
                </Tabs>
            </Paper>

            <Switch>
                {tabs.map((tab) => {
                    const VisualComponent = tab.type;
                    return (
                        <Route key={tab.path} exact path={`${parentPath}${tab.path}`}><VisualComponent /></Route>
                    );
                })}

                {/** Default route is the 1st one */}
                <Redirect exact to={`${parentPath}${tabs[0].path}`} />
            </Switch>
        </>
    );
};

export default FeaturesGroup;
