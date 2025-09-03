import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

export default function Status() {
  const data = {
    exchangeRate: '1 USDT = 0.0786 BNB',
    networkFee: '0.048 BNB +10.00 USDT',
    bitcoin: '0.048 BNB +10.00 USDT',
    ethereum: '0.048 BNB +10.00 USDT',
    maxTotal: '786.00 USDT',
  };

  return (
    <Box display={'flex'} alignItems={'center'} flexDirection={'column'} gap={2} style={{ color: '#fff', border: '1px solid rgba(25, 118, 210, 1)', borderRadius: '18px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="body1">Exchange Rate</Typography>
        <Typography variant="body1">{data.exchangeRate}</Typography>
      </Box>
      <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="body1">Network Fee</Typography>
        <Typography variant="body1">{data.networkFee}</Typography>
      </Box>
      <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="body1">Bitcoin</Typography>
        <Typography variant="body1">{data.bitcoin}</Typography>
      </Box>
      <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="body1">Ethereum</Typography>
        <Typography variant="body1">{data.ethereum}</Typography>
      </Box>

      <Box sx={{ display: 'inline-block', backgroundColor: '#fff', width: '100%', height: '1px', opacity: '0.2' }} />

      <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
        <Typography variant="body1">Max Total</Typography>
        <Typography variant="body1">{data.maxTotal}</Typography>
      </Box>
    </Box>
  );
}
