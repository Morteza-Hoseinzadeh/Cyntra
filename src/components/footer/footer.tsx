import React from 'react';
import { Box, IconButton, Skeleton } from '@mui/material';

import { SlArrowRight } from 'react-icons/sl';

export default function Footer({ loading, fromSelectedCrypto, toSelectedCrypto, cryptoList }: any) {
  function handleFindCryptoCoin(symbol: string) {
    return cryptoList.find((c: any) => c.symbol === symbol);
  }

  const durations = [1.5, 1.5, 1.5, 1.5];

  const handleColor = (index: number) => {
    switch (index) {
      case 0:
        return 'rgba(255,255,255, 0.4)';
      case 1:
        return 'rgba(255,255,255, 0.6)';
      case 2:
        return 'rgba(255,255,255, 0.8)';
      case 3:
        return 'rgba(255,255,255, 1)';
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 12, left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 1000 }}>
      <Box sx={{ backgroundColor: '#004BA0', width: '100%', maxWidth: 500, display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, py: 1.5, boxSizing: 'border-box', borderRadius: '24px', mx: 2 }}>
        <Box sx={{ backgroundColor: '#00152dff', borderRadius: '18px', p: 0.1 }}>
          <IconButton sx={{ color: '#fff' }}>{loading ? <Skeleton sx={{ backgroundColor: 'grey' }} variant="circular" width={32} height={32} /> : handleFindCryptoCoin(fromSelectedCrypto)?.icon || '-'}</IconButton>
        </Box>

        <Box display={'flex'} alignItems={'center'} gap={1}>
          {Array.from({ length: 4 }).map((_, index) => (
            <Box key={index} className="fade-arrow" style={{ color: handleColor(index), animationDuration: `${durations[index]}s`, animationDelay: `${index * 0.2}s` }}>
              <SlArrowRight size={20} style={{ color: handleColor(index) }} />
            </Box>
          ))}
        </Box>

        <Box sx={{ backgroundColor: '#00152dff', borderRadius: '18px', p: 0.1 }}>
          <IconButton sx={{ color: '#fff' }}>{loading ? <Skeleton sx={{ backgroundColor: 'grey' }} variant="circular" width={32} height={32} /> : handleFindCryptoCoin(toSelectedCrypto)?.icon || '-'}</IconButton>
        </Box>
      </Box>
    </Box>
  );
}
