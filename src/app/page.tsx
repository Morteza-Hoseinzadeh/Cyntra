'use client';

import React from 'react';
import { Box } from '@mui/material';
import Cards from '@/components/tokenCards/cards';
import Header from '@/components/header/header';

export default function Page() {
  return (
    <Box display={'flex'} flexDirection="column" alignItems="center" gap={4}>
      <Header />
      <Cards />
    </Box>
  );
}
