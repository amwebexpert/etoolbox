import { Box, isWidthUp, Paper, Tab, Table, TableBody, TableContainer, TableHead, TablePagination, TableRow, Tabs, Toolbar, withWidth } from '@material-ui/core';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { applyHtmlEntitiesFilter, HtmlEntity } from '../../actions/html-entitie-actions';
import { applyMimeTypesFilter } from '../../actions/mime-type-actions';
import { AppState } from '../../reducers';
import Filter from '../../components/Filter';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import { TabPanel } from './TabPanel';
import { Helmet } from 'react-helmet';
import FilterStats from '../../components/FilterStats';
import { usePagination } from '../../hooks/usePagination';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

enum TABS {
    MIME_TYPES = 0,
    HTML_ENTITIES = 1,
}

interface Props {
    width: Breakpoint;
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
    const { page, setPage, rowsPerPage, handleChangeRowsPerPage } = usePagination();

    const onTabSelected = (_e: unknown, newTab: number) => {
        setSelectedTab(newTab);
        applyFilter('');
        setPage(0);
    };

    function applyFilter(newInputFilter: string) {
        setInputFilter(newInputFilter);
        setPage(0);
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

                <Toolbar className={classes.toolbar}>
                    <Filter initialFilter={inputFilter} onFilterChange={applyFilter} />
                    <Box display='flex' flexGrow={1}></Box>
                    <FilterStats count={getElementsCount()} searching={searching} />
                </Toolbar>

                <TabPanel value={selectedTab} index={TABS.MIME_TYPES}>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component='div'
                        count={[...mimeTypes.keys()].length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(_, page) => setPage(page)}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <TableContainer component={Paper}>
                        <Table size={isWidthUp('md', props.width) ? 'medium' : 'small'}>
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    <StyledTableCell component="th" scope="row">Mime Type</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">File extension</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {[...mimeTypes.keys()]
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(key => {
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
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component='div'
                        count={htmlEntities.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(_, page) => setPage(page)}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    <TableContainer component={Paper}>
                        <Table size={isWidthUp('md', props.width) ? 'medium' : 'small'}>
                            <TableHead className={classes.tableHeader}>
                                <TableRow>
                                    <StyledTableCell component="th" scope="row">Entity</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">Name</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">Number</StyledTableCell>
                                    <StyledTableCell component="th" scope="row">Description</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {htmlEntities
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map(htmlEntity => (
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

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(CommonLists));
