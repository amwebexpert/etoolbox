import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';

import { useStyles } from './styles';

interface Props {
  label?: string;
  autofocus?: boolean;
  fullWidth?: boolean;
  initialFilter?: string;
  onFilterChange: (newValue: string) => void;
}

const Filter: React.FC<Props> = ({
  label = 'Search',
  autofocus = false,
  fullWidth = false,
  initialFilter = '',
  onFilterChange,
}) => {
  const [filter, setFilter] = React.useState(initialFilter);
  const classes = useStyles();

  // https://www.npmjs.com/package/use-debounce
  const debounced = useDebouncedCallback((filter: string) => onFilterChange(filter), 300);

  React.useEffect(() => debounced(filter), [filter, debounced]);

  return (
    <FormControl fullWidth={fullWidth} className={classes.root}>
      <InputLabel htmlFor="searchField">{label}</InputLabel>
      <Input
        id="searchField"
        autoFocus={autofocus}
        type="text"
        value={filter}
        onChange={e => setFilter(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Filter;
