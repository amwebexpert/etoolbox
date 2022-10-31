import { Button, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useIsWidthUp } from '../../theme';

type PokerCardType = {
    value: string;
    isDisabled: boolean;
    isSelected: boolean;
    onClick: (value: string) => void;
};

const PokerCard: React.FC<PokerCardType> = ({ value, isDisabled, isSelected, onClick }) => {
    const theme = useTheme();
    const isMdUp = useIsWidthUp('md');
    const size = isMdUp ? '70px' : '48px';

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

export default PokerCard;
