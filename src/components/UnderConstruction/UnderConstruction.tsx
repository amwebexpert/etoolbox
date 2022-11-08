import React from 'react';

import UnderConstructionIcon from '@mui/icons-material/ReportProblem';
import { Box, Typography, useTheme } from '@mui/material';

type Props = {
  featureDescription: string;
};

export const UnderConstruction: React.FC<Props> = ({ featureDescription }) => {
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Box m={theme.spacing(1)} />
      <Typography variant="subtitle1">This feature is under construction</Typography>

      <Box m={theme.spacing(0.125)} />
      <Box display="flex" alignItems="center" justifyContent="center">
        <UnderConstructionIcon />

        <Box m={theme.spacing(0.125)} />
        <Typography variant="body2">{featureDescription}</Typography>

        <Box m={theme.spacing(0.125)} />
        <UnderConstructionIcon />
      </Box>
    </Box>
  );
};
