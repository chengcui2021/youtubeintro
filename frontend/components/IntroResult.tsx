// frontend/components/IntroResult.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';

interface IntroResultProps {
  intro: string;
}

const IntroResult: React.FC<IntroResultProps> = ({ intro }) => {
  return (
    <Box sx={{ marginTop: '20px' }}>
      <Typography variant="h6">Generated Intro:</Typography>
      <Typography>{intro}</Typography>
    </Box>
  );
};

export default IntroResult;
