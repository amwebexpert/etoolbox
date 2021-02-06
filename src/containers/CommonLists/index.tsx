import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppBar, Box, Paper, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, Toolbar, Typography } from '@material-ui/core';
import TocIcon from '@material-ui/icons/Toc';

import Highlighter from 'react-highlight-words';

import { setTextAction } from '../../actions/text-actions';
import { AppState } from '../../reducers';
import FeatureTitle from '../../components/FeatureTitle';
import { TabPanel } from './TabPanel';
import { useStyles, StyledTableCell, StyledTableRow } from './styles';
import { applyMimeTypesFilter } from '../../actions/mime-type-actions';
import { Filter } from './Filter';

interface Props {
    inputText: string;
    filtering: boolean;
    mimeTypes: Map<string, string[]>;
    storeInputText: (name: string, value: string) => void;
    applyMimeTypesFilter: (searchTerm: string) => void;
}

const CommonLists: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const { inputText, filtering, storeInputText, mimeTypes, applyMimeTypesFilter } = props;
    const status = filtering ? 'filtering...' : '\u00A0';

    const handleTabSelection = (_e: any, newTab: number) => {
        setSelectedTab(newTab);
    };

    function handleFilter(newSearchTerm: string) {
        storeInputText('lastSearchValue', newSearchTerm);
        applyMimeTypesFilter(newSearchTerm);
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={TocIcon} title="Mime-types, HTML Entities..." />

            <Toolbar className={classes.toolbar}>
                <div>
                    <Typography>Count: <strong>{mimeTypes.size}</strong></Typography>
                    <Typography>{status}</Typography>
                </div>
                <Box display='flex' flexGrow={1}></Box>
                <Filter initialFilter={inputText} onFilterChange={handleFilter} />
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
                                    <StyledTableCell component="th" scope="row">Mime Type</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">File extension</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[...mimeTypes.keys()].map(key => {
                                    const extensions: string[] = mimeTypes.get(key) || [];
                                    const value = extensions.join(', ');
                                    return (
                                        <StyledTableRow key={key}>
                                            <StyledTableCell>
                                                <Highlighter searchWords={[inputText]} textToHighlight={key} />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Highlighter searchWords={[inputText]} textToHighlight={value} />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
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
        inputText: state.textInputs['lastSearchValue'],
        mimeTypes: state.mimeTypes.elements,
        filtering: state.mimeTypes.filtering,
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
        applyMimeTypesFilter: (searchTerm: string) => dispatch(applyMimeTypesFilter(searchTerm)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonLists);
