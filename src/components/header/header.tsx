import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { TbArrowLeft } from 'react-icons/tb';
import { GoBell } from 'react-icons/go';

export default function Header() {
  return (
    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <Box>
        <IconButton size="medium" sx={{ backgroundColor: 'rgba(255,255,255, 0.1)' }}>
          <TbArrowLeft size={25} color="#fff" />
        </IconButton>
      </Box>
      <Box>
        <Typography variant="h6" component="h6" fontWeight="600" color="#fff">
          Currency Convertor
        </Typography>
      </Box>
      <Box position={'relative'} display={'flex'} alignItems={'center'} gap={0.5}>
        <IconButton size="medium" sx={{ backgroundColor: 'rgba(255,255,255, 0.1)' }}>
          <GoBell size={25} color="#fff" />
        </IconButton>
        <Box position={'absolute'} top={0} right={0} bgcolor={'#00FFAA'} borderRadius={'50%'} width={10} height={10} />
      </Box>
    </Box>
  );
}
