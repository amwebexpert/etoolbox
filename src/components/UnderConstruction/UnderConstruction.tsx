import React from 'react';

import UnderConstructionIcon from '@mui/icons-material/ReportProblem';
import { Box, Typography, useTheme } from '@mui/material';

type Props = {
  featureDescription: string;
};

export const UnderConstruction: React.FC<Props> = ({ featureDescription }) => {
  const theme = useTheme();

  return (
    <Box component='div' flexDirection='column' alignItems='center' justifyContent='center'>
      <Box component='div' mx={theme.spacing(1)} />
      <Typography variant='subtitle1'>This feature is under construction</Typography>

      <Box component='div' mx={theme.spacing(0.125)} />
      <Box component='div' alignItems='center' justifyContent='center'>
        <UnderConstructionIcon />

        <Box component='div' mx={theme.spacing(0.125)} />
        <Typography variant='body2'>{featureDescription}</Typography>

        <Box component='div' mx={theme.spacing(0.125)} />
        <UnderConstructionIcon />
      </Box>
    </Box>
  );
};
