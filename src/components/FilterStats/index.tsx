import React from 'react';
import { Typography } from '@material-ui/core';

import { useStyles } from './styles';
import { SPACE } from '../../constants';

interface Props {
    searching: boolean;
    count: number;
}

const FILTERING = 'filtering…';

const FilterStats: React.FC<Props> = (props: Props) => {
    const classes = useStyles();
    const [working, setWorking] = React.useState(SPACE);
    const { count, searching } = props;

    React.useEffect(() => {
        if (searching) {
            setWorking(FILTERING);
        } else {
            setTimeout(() => setWorking(SPACE), 800);
        }
    }, [searching]);

    return (
        <div className={classes.root}>
            <Typography align="right">{working}</Typography>
            <Typography align="right">{count}</Typography>
        </div>
    );
}

export default FilterStats;
