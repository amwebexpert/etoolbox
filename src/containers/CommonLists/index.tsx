import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import TocIcon from '@material-ui/icons/Toc';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import { AppBar, FormControl, IconButton, Input, InputAdornment, InputLabel, Tab, Tabs, Typography } from '@material-ui/core';
import FeatureTitle from '../../components/FeatureTitle';
import { TabPanel } from './TabPanel';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1),
    },
    margin: {
        margin: theme.spacing(1),
    },
    textField: {
        width: '25ch',
    },
    toolbar: {
        margin: 0,
        padding: 0,
        '& > *': {
            marginLeft: theme.spacing(1),
        },
    },
    tabsPanel: {
        flexGrow: 1,
        width: '100%',
        marginTop: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
    },
}));

interface Props {
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
}

const CommonLists: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const { inputText, storeInputText } = props;

    const handleTabSelection = (_e: any, newTab: number) => {
        setSelectedTab(newTab);
    };

    function handleFilter(searchText: string) {
        storeInputText('lastSearchValue', searchText);
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={TocIcon} title="Mime-types, HTML Entities..." />

            <form noValidate autoComplete="off">
                <div>
                    <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                        <InputLabel htmlFor="searchField">Search</InputLabel>
                        <Input
                            id="searchField"
                            type="text"
                            value={inputText}
                            onChange={e => handleFilter(e.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton><SearchIcon /></IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </div>
            </form>

            <div className={classes.tabsPanel}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabSelection}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="on"
                        aria-label="common web lists"
                    >
                        <Tab label="Mime-types" id="mime-types" aria-controls="tab-mime-types" />
                        <Tab label="HTML Entities" id="html-entities" aria-controls="tab-html-entities" />
                    </Tabs>
                </AppBar>
                <TabPanel value={selectedTab} index={0}>
                    <Typography>Mime-types</Typography>
                </TabPanel>
                <TabPanel value={selectedTab} index={1}>
                    <Typography>HTML Entities</Typography>
                </TabPanel>
            </div>
        </div>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        inputText: state.textInputs.map.get('lastSearchValue')
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonLists);
