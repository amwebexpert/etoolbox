import React from 'react';
import clsx from 'clsx';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppBar, Box, FormControl, IconButton, Input, InputAdornment, InputLabel, Paper, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, Toolbar, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TocIcon from '@material-ui/icons/Toc';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import FeatureTitle from '../../components/FeatureTitle';
import { TabPanel } from './TabPanel';
import { useStyles, StyledTableCell, StyledTableRow } from './styles';
import useDebounce from '../../services/use-debounce';
import { filterMimeTypes } from './services';
import { useGlobalSpinnerUpdate } from '../../components/Spinner/GlobalSpinnerProvider';

interface Props {
    inputText?: string;
    storeInputText: (name: string, value: string) => void;
}

const CommonLists: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const { setGlobalSpinnerState } = useGlobalSpinnerUpdate();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const { inputText, storeInputText } = props;

    // State and setter for search term
    const [searchTerm, setSearchTerm] = React.useState(inputText);
    // State and setter for search results
    const [results, setResults] = React.useState<Map<string, any>>(new Map());
    // State for search status (whether there is a pending API request)
    const [isSearching, setIsSearching] = React.useState(false);

    // Now we call our hook, passing in the current searchTerm value.
    // The hook will only return the latest value (what we passed in) ...
    // ... if it's been more than 500ms since it was last called.
    // Otherwise, it will return the previous value of searchTerm.
    // The goal is to only have the API call fire when user stops typing ...
    // ... so that we aren't hitting our API rapidly.
    const debouncedSearchTerm = useDebounce(searchTerm, 200);

    // Here's where the API call happens
    // We use useEffect since this is an asynchronous action
    React.useEffect(() => {
        // Set isSearching state
        setIsSearching(true);

        setTimeout(() => {
            setResults(filterMimeTypes(debouncedSearchTerm));
            setIsSearching(false);
        }, 200);
    }, [debouncedSearchTerm]);

    React.useEffect(() => {
            setGlobalSpinnerState({ open: isSearching });
    }, [debouncedSearchTerm, isSearching, setGlobalSpinnerState]);

    const handleTabSelection = (_e: any, newTab: number) => {
        setSelectedTab(newTab);
    };

    function handleFilter(newSearchTerm: string) {
        setSearchTerm(newSearchTerm);
        storeInputText('lastSearchValue', newSearchTerm);
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={TocIcon} title="Mime-types, HTML Entities..." />

            <Toolbar className={classes.toolbar}>
                <Typography>Elements: <strong>{results.size}</strong></Typography>
                <Box display='flex' flexGrow={1}></Box>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
                    <InputLabel htmlFor="searchField">Search</InputLabel>
                    <Input
                        id="searchField"
                        type="text"
                        value={searchTerm}
                        onChange={e => handleFilter(e.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton><SearchIcon /></IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Toolbar>

            <div className={classes.tabsPanel}>
                <AppBar position="static" color="default" className={classes.tabsBar}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabSelection}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="on"
                        aria-label="Common web lists"
                    >
                        <Tab label="Mime-types" id="mime-types" aria-controls="tab-mime-types" />
                        <Tab label="HTML Entities" id="html-entities" aria-controls="tab-html-entities" />
                    </Tabs>
                </AppBar>

                <TabPanel value={selectedTab} index={0}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    <StyledTableCell>Mime Type</StyledTableCell>
                                    <StyledTableCell>File extension</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[...results.keys()].sort().map(key => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell component="th" scope="row">{key}</StyledTableCell>
                                        <StyledTableCell>{results.get(key)}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
