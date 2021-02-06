import React from 'react';
import { FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';

import { useStyles } from './styles';
import { useDebouncedCallback } from 'use-debounce/lib';

interface Props {
    initialFilter: string;
    onFilterChange: (newValue: string) => void;
}

export const Filter: React.FC<Props> = (props: Props) => {
    const { initialFilter, onFilterChange } = props;
    const [filter, setFilter] = React.useState(initialFilter);
    const classes = useStyles();

    // https://www.npmjs.com/package/use-debounce
    const debounced = useDebouncedCallback(
        (filter: string) => onFilterChange(filter),
        300
    );

    React.useEffect(() => debounced.callback(filter), [filter, debounced]);

    return (
        <FormControl className={clsx(classes.margin, classes.textField)}>
            <InputLabel htmlFor="searchField">Search</InputLabel>
            <Input
                id="searchField"
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton><SearchIcon /></IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
}
