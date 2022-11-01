import {
  Badge,
  FormControl,
  Grid,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PaletteIcon from '@mui/icons-material/Palette';
import * as copy from 'copy-to-clipboard';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Highlighter from 'react-highlight-words';
import { useDebouncedCallback } from 'use-debounce';
import FeatureTitle from '../../components/FeatureTitle';
import Filter from '../../components/Filter';
import { useToasterUpdate } from '../../components/Toaster/ToasterProvider';
import { usePagination } from '../../hooks/usePagination';
import * as services from './services';
import { useIsWidthUp } from '../../theme';

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
  tableHeader: {
    backgroundColor: theme.palette.primary.main,
  },
  colorCell: {
    cursor: 'pointer',
  },
  form: {
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
  },
  searchFilter: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  },
}));

const NamedColors = () => {
  const title = 'Color categories';
  const classes = useStyles();
  const isMdUp = useIsWidthUp('md');
  const { setToasterState } = useToasterUpdate();
  const [colors, setColors] = useState(services.NAMED_COLORS);
  const [family, setFamily] = useState('-');
  const [filter, setFilter] = useState('');
  const { page, setPage, rowsPerPage, handleChangeRowsPerPage } = usePagination();

  // https://www.npmjs.com/package/use-debounce
  const debounced = useDebouncedCallback((family: string, filter: string) => {
    setPage(0);
    setColors(services.applyFiltering(family, filter));
  }, 300);

  React.useEffect(() => debounced(family, filter), [filter, family, debounced]);

  useEffect(() => {
    setPage(0);
    setColors(services.applyFiltering(family));
  }, [family, setColors, setPage]);

  const handleCopy = (data: string) => {
    const feedback = data.substr(0, 20);
    const message = `Content copied into clipboard: ${feedback} …`;

    copy.default(data, { format: 'text/plain' });
    setToasterState({ open: true, message, type: 'success', autoHideDuration: 2000 });
  };

  return (
    <>
      <Helmet title={title} />
      <div className={classes.root}>
        <FeatureTitle iconType={PaletteIcon} title={title} />

        <div className={classes.form}>
          <Grid container spacing={1}>
            <Grid item md={6} sm={12} xs={12}>
              <FormControl className={classes.formControl}>
                <TextField
                  select={true}
                  name="family"
                  value={family}
                  label="Family"
                  autoFocus={isMdUp}
                  style={{ width: 260 }}
                  onChange={e => setFamily(e.target.value)}>
                  <MenuItem key="-" value="-">
                    All
                  </MenuItem>
                  {services.FAMILY_NAMES.map(name => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item md={6} sm={12} xs={12}>
              <div className={classes.searchFilter}>
                <Filter initialFilter={filter} label="Filter" onFilterChange={setFilter} />
              </div>
            </Grid>
          </Grid>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100, 200]}
          component="div"
          count={colors.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_, page) => setPage(page)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TableContainer component={Paper}>
          <Table size={isMdUp ? 'medium' : 'small'}>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell component="th" scope="row">
                  Name
                </TableCell>
                <TableCell component="th" scope="row">
                  RGB
                </TableCell>
                <TableCell component="th" scope="row">
                  HEX
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {colors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(c => {
                const hexCode = services.formatHexCode(c);
                const rgbCode = services.formatRGB(c);

                return (
                  <TableRow key={c.htmlName + c.hexCode}>
                    <TableCell
                      className={classes.colorCell}
                      onClick={() => handleCopy(c.htmlName)}
                      title="Copy name to clipboard">
                      <strong>
                        <Highlighter searchWords={[filter]} textToHighlight={c.htmlName} />
                      </strong>
                      <br />({c.family})
                    </TableCell>
                    <TableCell
                      className={classes.colorCell}
                      style={{ backgroundColor: hexCode, width: '30%' }}
                      onClick={() => handleCopy(rgbCode)}
                      title="Copy RGB code to clipboard">
                      <Badge
                        badgeContent={<Highlighter searchWords={[filter]} textToHighlight={rgbCode} />}
                        color="primary"
                      />
                    </TableCell>
                    <TableCell
                      className={classes.colorCell}
                      style={{ backgroundColor: hexCode, width: '30%' }}
                      onClick={() => handleCopy(hexCode)}
                      title="Copy HEX code to clipboard">
                      <Badge
                        badgeContent={<Highlighter searchWords={[filter]} textToHighlight={hexCode} />}
                        color="primary"
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default NamedColors;
