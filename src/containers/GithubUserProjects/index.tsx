import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Helmet } from 'react-helmet';

import { Box, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@material-ui/core';
import GithubIcon from '@material-ui/icons/GitHub';

import FeatureTitle from '../../components/FeatureTitle';
import { AppState } from '../../reducers';
import Filter from '../../components/Filter';
import { listGithubUserProjectsRequested } from '../../actions/github-userprojects-actions';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';
import { GithubUserProject } from '../../types/github-types';
import { useGlobalSpinnerUpdate } from '../../components/Spinner/GlobalSpinnerProvider';

interface Props {
    projects: GithubUserProject[];
    searching: boolean;

    listGithubUserProjectsRequested: (username: string) => void;
}

const GithubUserProjects: React.FC<Props> = (props: Props) => {
    const title = 'Github user projects';
    const classes = useStyles();
    const [inputFilter, setInputFilter] = React.useState('');
    const { searching, projects, listGithubUserProjectsRequested } = props;
    const { setGlobalSpinnerState } = useGlobalSpinnerUpdate();

    function applyFilter(newInputFilter: string) {
        setInputFilter(newInputFilter);
        listGithubUserProjectsRequested(newInputFilter);
    }

    React.useEffect(() => {
        if (searching) {
            setGlobalSpinnerState({ open: true });
        } else {
            setTimeout(() => setGlobalSpinnerState({ open: false }), 1000);
        }
    }, [searching, setGlobalSpinnerState]);

    return (
        <>
            <Helmet title={title} />
            <div className={classes.root}>
                <FeatureTitle iconType={GithubIcon} title={title} />

                <Toolbar className={classes.toolbar}>
                    <Typography>Count: <strong>{projects.length}</strong></Typography>
                    <Box display='flex' flexGrow={1}></Box>
                    <Filter label="Username" initialFilter={inputFilter} onFilterChange={applyFilter} />
                </Toolbar>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead className={classes.tableHeader}>
                            <TableRow>
                                <StyledTableCell component="th" scope="row">Name</StyledTableCell>
                                <StyledTableCell component="th" scope="row">Description</StyledTableCell>
                                <StyledTableCell component="th" scope="row">Updated</StyledTableCell>
                                <StyledTableCell component="th" scope="row">Watchers</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {projects.map(project => {
                                return (
                                    <StyledTableRow key={project.id}>
                                        <StyledTableCell>
                                            <a href={project.html_url} target="_blank" rel="noreferrer">{project.name}</a>
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {project.description}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {project.updated_at}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                            {project.watchers_count}
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

export function mapStateToProps(state: AppState) {
    return {
        projects: state.githubUserProjects.projects,
        searching: state.githubUserProjects.searching,
    }
}

export function mapDispatchToProps(dispatch: Dispatch) {
    return {
        listGithubUserProjectsRequested: (username: string) => dispatch(listGithubUserProjectsRequested(username)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubUserProjects);
