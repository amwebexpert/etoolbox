import { Button, Typography, useTheme } from '@material-ui/core';
import React from 'react';

type PokerCardType = {
    key: string;
    value: string;
    isSelected: boolean;
    onClick: (value: string) => void;
};

const SIZE = 70;
const SIZE_PX = `${SIZE}px`;

export const PokerCard: React.FC<PokerCardType> = ({ key, value, isSelected, onClick }) => {
    const theme = useTheme();

    return (
        <Button
            key={key}
            style={{
                maxWidth: SIZE_PX,
                maxHeight: SIZE_PX,
                minWidth: SIZE_PX,
                minHeight: SIZE_PX,
                margin: theme.spacing(1),
            }}
            variant={isSelected ? 'contained' : 'outlined'}
            title={`Estimate the current story point as: $[{value}]`}
            color="primary"
            onClick={() => onClick(value)}>
            <Typography variant="h5">{value}</Typography>
        </Button>
    );
};
