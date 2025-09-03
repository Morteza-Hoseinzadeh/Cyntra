'use client';

import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { TbLanguage } from 'react-icons/tb';
import { GoBell } from 'react-icons/go';

export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedLang, setSelectedLang] = useState('EN');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang?: string) => {
    if (lang) setSelectedLang(lang);
    setAnchorEl(null);
  };

  return (
    <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      <Box>
        <IconButton size="medium" sx={{ backgroundColor: 'rgba(255,255,255, 0.1)' }} onClick={handleClick}>
          <TbLanguage size={25} color="#fff" />
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <MenuItem onClick={() => handleClose('EN')}>
            <img style={{ marginRight: 8 }} src="https://flagsapi.com/GB/flat/64.png" alt="English" width={25} height={25} />
            <Typography>English</Typography>
          </MenuItem>
          <MenuItem onClick={() => handleClose('AR')}>
            <img style={{ marginRight: 8 }} src="https://flagsapi.com/SA/flat/64.png" alt="Arabic" width={25} height={25} />
            <Typography>Arabic</Typography>
          </MenuItem>
        </Menu>
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
