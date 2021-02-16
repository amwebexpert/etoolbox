import { AppBar, Box, Paper, Tab, Table, TableBody, TableContainer, TableHead, TableRow, Tabs, Toolbar } from '@material-ui/core';
import TocIcon from '@material-ui/icons/Toc';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { applyHtmlEntitiesFilter, HtmlEntity } from '../../actions/html-entitie-actions';
import { applyMimeTypesFilter } from '../../actions/mime-type-actions';
import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import Filter from '../../components/Filter';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import { TabPanel } from './TabPanel';
import { Helmet } from 'react-helmet';
import FilterStats from '../../components/FilterStats';

enum TABS {
    MIME_TYPES = 0,
    HTML_ENTITIES = 1,
}

interface Props {
    mimeTypes: Map<string, string[]>;
    filteringMimeTypes: boolean;
    htmlEntities: HtmlEntity[];
    filteringHtmlEntities: boolean;

    applyMimeTypesFilter: (searchTerm: string) => void;
    applyHtmlEntitiesFilter: (searchTerm: string) => void;
}

const CommonLists: React.FC<Props> = (props: Props) => {
    const title = 'Mime-types, HTML Entities…';
    const classes = useStyles();
    const [selectedTab, setSelectedTab] = React.useState(TABS.MIME_TYPES);
    const [inputFilter, setInputFilter] = React.useState('');
    const { filteringMimeTypes, mimeTypes, filteringHtmlEntities, htmlEntities, applyMimeTypesFilter, applyHtmlEntitiesFilter } = props;
    const searching = filteringMimeTypes || filteringHtmlEntities;

    const onTabSelected = (_e: any, newTab: number) => {
        setSelectedTab(newTab);
        applyFilter('');
    };

    function applyFilter(newInputFilter: string) {
        setInputFilter(newInputFilter);
        if (selectedTab === TABS.MIME_TYPES) {
            applyMimeTypesFilter(newInputFilter);
        } else {
            applyHtmlEntitiesFilter(newInputFilter);
        }
    }

    function getElementsCount(): number {
        if (selectedTab === TABS.MIME_TYPES) {
            return mimeTypes.size;
        } else {
            return htmlEntities.length;
        }
    }

    return (
        <>
            <Helmet title={title} />
            <Paper square>
                <Tabs
                    value={selectedTab}
                    onChange={onTabSelected}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="on"
                    aria-label="Common web lists"
                >
                    <Tab label="Mime-types" id="mime-types" aria-controls="tab-mime-types" />
                    <Tab label="HTML Entities" id="html-entities" aria-controls="tab-html-entities" />
                </Tabs>
            </Paper>

            <div className={classes.root}>
                <FeatureTitle iconType={TocIcon} title={title} />

                <Toolbar className={classes.toolbar}>
                    <Filter initialFilter={inputFilter} onFilterChange={applyFilter} />
                    <Box display='flex' flexGrow={1}></Box>
                    <FilterStats count={getElementsCount()} searching={searching} />
                </Toolbar>

                <TabPanel value={selectedTab} index={TABS.MIME_TYPES}>
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
                                                <Highlighter searchWords={[inputFilter]} textToHighlight={key} />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <Highlighter searchWords={[inputFilter]} textToHighlight={value} />
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>

                <TabPanel value={selectedTab} index={TABS.HTML_ENTITIES}>
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
                            <TableBody>
                                {htmlEntities.map(htmlEntity => (
                                    <StyledTableRow key={htmlEntity.entityNumber}>
                                        <StyledTableCell>
                                            <Highlighter searchWords={[inputFilter]} textToHighlight={htmlEntity.character} />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Highlighter searchWords={[inputFilter]} textToHighlight={htmlEntity.entityName} />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Highlighter searchWords={[inputFilter]} textToHighlight={htmlEntity.entityNumber} />
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            <Highlighter searchWords={[inputFilter]} textToHighlight={htmlEntity.description} />
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </div>
        </>
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
