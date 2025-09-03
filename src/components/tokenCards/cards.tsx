'use client';

import React from 'react';
import { Box, Button, IconButton, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import { SiTether } from 'react-icons/si';
import { IoIosArrowDown } from 'react-icons/io';
import { TbArrowsExchange2 } from 'react-icons/tb';
import { RiBnbFill } from 'react-icons/ri';

// ✅ Top Section (Title + Buttons)
function YouPayCardHeader() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="body2" component="span" fontWeight="600" color="#00FFAA">
        You Pay
      </Typography>
      <Box display="flex" alignItems="center" gap={0.5}>
        <Button size="small" variant="outlined" sx={{ color: '#00FFAA', borderColor: 'rgba(0, 255, 170, 0.3)', borderRadius: '12px', fontSize: '0.75rem', padding: '2px 8px', minWidth: 'auto', '&:hover': { borderColor: '#00FFAA', backgroundColor: 'rgba(0, 255, 170, 0.1)' } }}>
          Half
        </Button>
        <Button size="small" variant="outlined" sx={{ color: '#00FFAA', borderColor: 'rgba(0, 255, 170, 0.3)', borderRadius: '12px', fontSize: '0.75rem', padding: '2px 8px', minWidth: 'auto', '&:hover': { borderColor: '#00FFAA', backgroundColor: 'rgba(0, 255, 170, 0.1)' } }}>
          Max
        </Button>
      </Box>
    </Box>
  );
}

// ✅ Middle Section (Token Selection + Amount)
function YouPayCardBody() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1.5}>
      <Box display="flex" alignItems="center">
        <Box sx={{ backgroundColor: 'rgba(25, 118, 210, 0.2)', mr: 1.5, p: 1, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <SiTether size={24} color="#fff" />
        </Box>
        <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
          <Typography variant="h6" component="h6" fontWeight="600" color="#00FFAA">
            USDT
          </Typography>
          <Box ml={0.5}>
            <IoIosArrowDown size={18} color="#00FFAA" />
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Typography variant="h5" component="h5" fontWeight="700" color="#00FFAA">
          786.00
        </Typography>
        <Typography variant="caption" component="span" color="rgba(0, 255, 170, 0.7)">
          ≈ $786.00
        </Typography>
      </Box>
    </Box>
  );
}

// ✅ Bottom Section (Balance Info)
function YouPayCardFooter() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
      <Typography variant="caption" component="span" color="rgba(0, 255, 170, 0.7)">
        Balance: 16,786.50 USDT
      </Typography>
    </Box>
  );
}

// ✅ You Pay Card's Container
function YouPayCardBar() {
  return (
    <Box width="100%" display="flex" flexDirection="column" p={2.5} sx={{ background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.3) 0%, rgba(0, 255, 255, 0.25) 100%)', borderRadius: '16px', color: '#00FFAA', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
      <YouPayCardHeader />
      <YouPayCardBody />
      <YouPayCardFooter />
    </Box>
  );
}

// ✅ Top Section (Title + Buttons)
function YouGetCardHeader() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="body2" component="span" fontWeight="600" color="#00FFAA">
        You Get
      </Typography>

      <Select defaultValue="Overview" size="small" sx={{ backgroundColor: 'rgba(0, 255, 170, 0.1)', borderRadius: '12px', minWidth: 100, height: 32, '& .MuiSelect-select': { color: '#00FFAA', padding: '6px 12px', fontSize: '0.875rem' }, '& .MuiSvgIcon-root': { color: '#00FFAA' }, '& fieldset': { border: '1px solid rgba(0, 255, 170, 0.3)' }, '&:hover fieldset': { borderColor: '#00FFAA !important' } }}>
        <MenuItem value="Overview" disabled>
          Overview
        </MenuItem>
        <MenuItem value="bnb">BNB</MenuItem>
      </Select>
    </Box>
  );
}

// ✅ Middle Section (Token Selection + Amount)
function YouGetCardBody() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1.5}>
      <Box display="flex" alignItems="center">
        <Box sx={{ backgroundColor: 'rgba(0, 255, 170, 0.1)', mr: 1.5, p: 1, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <RiBnbFill size={24} color="#fff" />
        </Box>
        <Box display="flex" alignItems="center" sx={{ cursor: 'pointer' }}>
          <Typography variant="h6" component="h6" fontWeight="600" color="#00FFAA">
            BNB
          </Typography>
          <Box ml={0.5}>
            <IoIosArrowDown size={18} color="#00FFAA" />
          </Box>
        </Box>
      </Box>

      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Typography variant="h5" component="h5" fontWeight="700" color="#00FFAA">
          2.50
        </Typography>
        <Typography variant="caption" component="span" color="rgba(0, 255, 170, 0.7)">
          ≈ $1,000.00
        </Typography>
      </Box>
    </Box>
  );
}

// ✅ Bottom Section (Balance Info)
function YouGetCardFooter() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
      <Typography variant="caption" component="span" color="rgba(0, 255, 170, 0.7)">
        Balance: 48.50 BNB
      </Typography>
    </Box>
  );
}

// ✅ You Get Card's Container
function YouGetCardBar() {
  return (
    <Box width="100%" display="flex" flexDirection="column" p={2.5} sx={{ background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.7) 0%, rgba(0, 255, 170, 0.2) 100%)', borderRadius: '16px', color: '#00FFAA' }}>
      <YouGetCardHeader />
      <YouGetCardBody />
      <YouGetCardFooter />
    </Box>
  );
}

function ExchangeButton() {
  return (
    <Box position={'relative'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} my={-1}>
      <Box position={'absolute'}>
        <IconButton sx={{ backgroundColor: '#0A1929', color: '#00FFAA', p: 1.5, borderRadius: '50%', border: '1px solid', borderColor: '#0A1929', zIndex: 2, '&:hover': { backgroundColor: '#0A1929', transform: 'rotate(180deg)', transition: 'transform 0.3s ease-in-out' } }}>
          <TbArrowsExchange2 size={28} style={{ transform: 'rotate(90deg)' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

// ✅ Main Card Component
export default function Cards() {
  const tooltip_text = 'Wallet connection is not available yet to ensure your privacy and security, and to maintain trust with our clients.';

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={2}>
      <YouPayCardBar />
      <ExchangeButton />
      <YouGetCardBar />

      <Tooltip title={tooltip_text} placement="top" arrow>
        <Button variant="contained" fullWidth sx={{ mt: 1, py: 1.5, borderRadius: '12px', fontWeight: '600', fontSize: '1rem', textTransform: 'none', backgroundColor: '#1565C0', color: '#fff', '&:hover': { boxShadow: '0 0 10px rgba(25, 118, 210, 1)' } }}>
          Connect Wallet
        </Button>
      </Tooltip>
    </Box>
  );
}
