'use client';

import React from 'react';
import { Box } from '@mui/material';
import Cards from '@/components/tokenCards/cards';
import Header from '@/components/header/header';
import Status from '@/components/statues/status';
import Footer from '@/components/footer/footer';

export default function page() {
  return (
    <Box>
      <Box mb={4}>
        <Header />
      </Box>
      <Box mb={4}>
        <Cards />
      </Box>
      <Box mb={14}>
        <Status />
      </Box>
      <Box>
        <Footer />
      </Box>
    </Box>
  );
}
