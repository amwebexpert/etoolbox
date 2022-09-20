import { Button, isWidthUp, Typography, useTheme, withWidth } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';
import React from 'react';

type PokerCardType = {
    width: Breakpoint;
    value: string;
    isDisabled: boolean;
    isSelected: boolean;
    onClick: (value: string) => void;
};

const PokerCard: React.FC<PokerCardType> = ({ width, value, isDisabled, isSelected, onClick }) => {
    const theme = useTheme();
    const size = isWidthUp('md', width) ? '70px' : '48px';

    return (
        <Button
            style={{
                maxWidth: size,
                maxHeight: size,
                minWidth: size,
                minHeight: size,
                margin: theme.spacing(1),
            }}
            variant={isSelected ? 'contained' : 'outlined'}
            disabled={isDisabled}
            title={`Estimate the current story point as: [${value}]`}
            color="primary"
            onClick={() => onClick(value)}>
            <Typography variant="h5">{value}</Typography>
        </Button>
    );
};

export default withWidth()(PokerCard);
