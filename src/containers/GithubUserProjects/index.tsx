import React from 'react';

import GithubIcon from '@mui/icons-material/GitHub';
import WatchIcon from '@mui/icons-material/Visibility';
import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { listGithubUserProjectsRequested } from '../../actions/github-userprojects-actions';
import { setTextAction } from '../../actions/text-actions';
import FeatureTitle from '../../components/FeatureTitle';
import Filter from '../../components/Filter';
import FilterStats from '../../components/FilterStats';
import { useGlobalSpinnerUpdate } from '../../components/Spinner/GlobalSpinnerProvider';
import { usePagination } from '../../hooks/usePagination';
import { AppState } from '../../reducers';
import { useIsWidthUp } from '../../theme';
import { GithubUserProject } from '../../types/github-types';
import { StyledTableCell, StyledTableRow, useStyles } from './styles';

interface Props {
  inputText: string;
  projects: GithubUserProject[];
  searching: boolean;

  listGithubUserProjectsRequested: (username: string) => void;
  storeInputText: (name: string, value: string) => void;
}

const GithubUserProjects: React.FC<Props> = (props: Props) => {
  const title = 'Github user projects';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const { inputText, searching, projects, listGithubUserProjectsRequested, storeInputText } = props;
  const [inputFilter, setInputFilter] = React.useState(inputText);
  const { setGlobalSpinnerState } = useGlobalSpinnerUpdate();
  const { page, setPage, rowsPerPage, handleChangeRowsPerPage } = usePagination();

  function applyFilter(newInputFilter: string) {
    setInputFilter(newInputFilter);
    listGithubUserProjectsRequested(newInputFilter);
    storeInputText('lastGithubUsernameValue', newInputFilter);
  }

  React.useEffect(() => {
    if (searching && inputText) {
      setGlobalSpinnerState({ open: true });
    } else {
      setTimeout(() => setGlobalSpinnerState({ open: false }), 500);
    }
  }, [searching, inputText, setGlobalSpinnerState]);

  return (
    <>
      <Helmet title={title} />
      <div className={classes.root}>
        <FeatureTitle iconType={GithubIcon} title={title} />

        <Toolbar className={classes.toolbar}>
          <Filter autofocus={isMdUp} label="Username" initialFilter={inputFilter} onFilterChange={applyFilter} />
          <Box display="flex" flexGrow={1}></Box>
          <FilterStats count={projects.length} searching={searching} />
        </Toolbar>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer component={Paper}>
          <Table size={isMdUp ? 'medium' : 'small'}>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <StyledTableCell component="th" scope="row">
                  Project
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  Description
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" className={classes.dateColumn}>
                  Updated
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <WatchIcon />
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(project => {
                return (
                  <StyledTableRow key={project.id}>
                    <StyledTableCell>
                      <Link href={project.html_url} target="_blank" rel="noreferrer">
                        {project.name}
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>{project.description}</StyledTableCell>
                    <StyledTableCell className={classes.dateColumn}>
                      {new Date(project.updated_at).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell className={classes.watchColumn}>{project.watchers_count}</StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export function mapStateToProps(state: AppState) {
  return {
    inputText: state.textInputs['lastGithubUsernameValue'],
    projects: state.githubUserProjects.projects,
    searching: state.githubUserProjects.searching,
  };
}

export function mapDispatchToProps(dispatch: Dispatch) {
  return {
    listGithubUserProjectsRequested: (username: string) => dispatch(listGithubUserProjectsRequested(username)),
    storeInputText: (name: string, value: string) => dispatch(setTextAction(name, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GithubUserProjects);
