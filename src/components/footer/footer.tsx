import React from 'react';
import { Box, IconButton } from '@mui/material';

import { SiTether } from 'react-icons/si';
import { RiBnbFill } from 'react-icons/ri';
import { SlArrowRight } from 'react-icons/sl';

export default function Footer() {
  const durations = [1.5, 1.5, 1.5];

  const handleColor = (index: number) => {
    switch (index) {
      case 0:
        return 'rgba(255,255,255, 0.5)';
      case 1:
        return 'rgba(255,255,255, 0.7)';
      case 2:
        return 'rgba(255,255,255, 1)';
      default:
        return 'rgba(255,255,255, 1)';
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 1000 }}>
      <Box sx={{ backgroundColor: '#004BA0', width: '100%', maxWidth: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5, boxSizing: 'border-box', borderRadius: '24px', mx: 2 }}>
        <Box sx={{ backgroundColor: '#fff', borderRadius: '18px' }}>
          <IconButton>
            <SiTether size={36} color="#004BA0" />
          </IconButton>
        </Box>

        <Box display={'flex'} alignItems={'center'} gap={1}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Box key={index} className="fade-arrow" style={{ color: handleColor(index), animationDuration: `${durations[index]}s`, animationDelay: `${index * 0.2}s` }}>
              <SlArrowRight style={{ color: handleColor(index) }} />
            </Box>
          ))}
        </Box>

        <Box sx={{ backgroundColor: '#fff', borderRadius: '18px' }}>
          <IconButton>
            <RiBnbFill size={36} color="#004BA0" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
