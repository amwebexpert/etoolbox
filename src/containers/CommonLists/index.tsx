import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { AppBar, Box, Paper, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, Toolbar, Typography } from '@material-ui/core';
import TocIcon from '@material-ui/icons/Toc';

import Highlighter from 'react-highlight-words';

import { AppState } from '../../reducers';
import FeatureTitle from '../../components/FeatureTitle';
import { TabPanel } from './TabPanel';
import { useStyles, StyledTableCell, StyledTableRow } from './styles';
import { applyMimeTypesFilter } from '../../actions/mime-type-actions';
import { Filter } from './Filter';
import { applyHtmlEntitiesFilter, HtmlEntity } from '../../actions/html-entitie-actions';

interface Props {
    mimeTypes: Map<string, string[]>;
    filteringMimeTypes: boolean;
    htmlEntities: HtmlEntity[];
    filteringHtmlEntities: boolean;

    applyMimeTypesFilter: (searchTerm: string) => void;
    applyHtmlEntitiesFilter: (searchTerm: string) => void;
}

const CommonLists: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [inputText, setInputText] = React.useState('');
    const { filteringMimeTypes, mimeTypes, filteringHtmlEntities, htmlEntities, applyMimeTypesFilter, applyHtmlEntitiesFilter } = props;
    const status = filteringMimeTypes || filteringHtmlEntities ? 'filtering...' : '\u00A0';

    const handleTabSelection = (_e: any, newTab: number) => {
        setSelectedTab(newTab);
        setInputText('');
    };

    function handleFilter(newFilter: string) {
        setInputText(newFilter);
        if (selectedTab === 0) {
            applyMimeTypesFilter(newFilter);
        } else {
            applyHtmlEntitiesFilter(newFilter);
        }
    }

    function getElementsCount(): number {
        if (selectedTab === 0) {
            return mimeTypes.size;
        } else {
            return htmlEntities.length;
        }
    }

    return (
        <div className={classes.root}>
            <FeatureTitle iconType={TocIcon} title="Mime-types, HTML Entities..." />

            <Toolbar className={classes.toolbar}>
                <div>
                    <Typography>Count: <strong>{getElementsCount()}</strong></Typography>
                    <Typography>{status}</Typography>
                </div>
                <Box display='flex' flexGrow={1}></Box>
                <Filter onFilterChange={handleFilter} />
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
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    <StyledTableCell component="th" scope="row">Html Entity</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">Name</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">Number</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">Description</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            {htmlEntities && htmlEntities.map(htmlEntity => (
                                    <StyledTableRow key={htmlEntity.entityNumber}>
                                        <StyledTableCell>
                                            <Highlighter searchWords={[inputText]} textToHighlight={htmlEntity.character} />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Highlighter searchWords={[inputText]} textToHighlight={htmlEntity.entityName} />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Highlighter searchWords={[inputText]} textToHighlight={htmlEntity.entityNumber} />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Highlighter searchWords={[inputText]} textToHighlight={htmlEntity.description} />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </Table>
                    </TableContainer>
                </TabPanel>
            </div>
        </div>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        mimeTypes: state.mimeTypes.elements,
        filteringMimeTypes: state.mimeTypes.filtering,

        htmlEntities: state.htmlEntities.elements,
        filteringHtmlEntities: state.htmlEntities.filtering,
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        applyMimeTypesFilter: (searchTerm: string) => dispatch(applyMimeTypesFilter(searchTerm)),
        applyHtmlEntitiesFilter: (searchTerm: string) => dispatch(applyHtmlEntitiesFilter(searchTerm)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonLists);
