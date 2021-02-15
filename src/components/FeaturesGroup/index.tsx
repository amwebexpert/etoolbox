import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Tab, Tabs } from '@material-ui/core';

import { Link, Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import URLParser from '../../containers/URLParser';
import URLEncoder from '../../containers/URLEncoder';

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
        }
    },
    linkMenu: {
        textDecoration: 'none',
        color: 'inherit',
    }
}));

// TODO Make this generic so we can reuse the FeaturesGroup
const TABS: Map<String, number> = new Map([
    ['/URL/URLParser', 0],
    ['/URL/URLEncoder', 1]]
);

const FeaturesGroup: React.FC = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const { path, url } = useRouteMatch();
    const location = useLocation();

    React.useEffect(
        () => {
            const tabIndex = TABS.get(location.pathname);
            setValue(tabIndex!);
        },
        [location, setValue]
    );

    return (
        <>
            <Paper className={classes.root}>
                <Tabs
                    value={value} centered
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(_e: any, newValue: number) => setValue(newValue)}
                >
                    { /** TODO Make this generic so we can reuse the FeaturesGroup */}
                    <Tab label="URL parser" to={`${url}/URLParser`} component={Link} />
                    <Tab label="URL encoder/decoder" to={`${url}/URLEncoder`} component={Link} />
                </Tabs>
            </Paper>

            <Switch>
                { /** TODO Make this generic so we can reuse the FeaturesGroup */}
                <Route exact path={`${path}/URLParser`}><URLParser /></Route>
                <Route exact path={`${path}/URLEncoder`}><URLEncoder /></Route>
            </Switch>
        </>
    );
}

export default FeaturesGroup;
