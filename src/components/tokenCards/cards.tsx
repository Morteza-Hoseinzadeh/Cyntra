'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, MenuItem, Select, Typography, SelectChangeEvent, Dialog, DialogContent, Skeleton } from '@mui/material';
import { SiBinance, SiBitcoin, SiCardano, SiEthereum, SiTether } from 'react-icons/si';
import { IoIosArrowDown } from 'react-icons/io';
import { TbArrowsExchange2 } from 'react-icons/tb';
import axiosInstance from '@/utils/hooks/axiosInstance';
import Footer from '../footer/footer';
import Status from '../statues/status';

// ✅ Popular Cryptos Mock
const cryptoList = [
  { symbol: 'BTC', name: 'Bitcoin', icon: <SiBitcoin size={32} color="#fff" /> },
  { symbol: 'ETH', name: 'Ethereum', icon: <SiEthereum size={32} color="#fff" /> },
  { symbol: 'USDT', name: 'Tether', icon: <SiTether size={32} color="#fff" /> },
  { symbol: 'BNB', name: 'Binance Coin', icon: <SiBinance size={32} color="#fff" /> },
  { symbol: 'ADA', name: 'Cardano', icon: <SiCardano size={32} color="#fff" /> },
];

// ✅ You Pay Card Components
function YouPayCardHeader({ amount, setAmount }: any) {
  const handleAcitions = (type: 'Half' | 'Max') => {
    if (type === 'Half') {
      setAmount((prev: any) => prev / 2);
    } else {
      setAmount((prev: any) => prev * 2);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Typography variant="body2" fontWeight="600" color="#00FFAA">
        You Pay
      </Typography>
      <Box display="flex" alignItems="center" gap={0.5}>
        <Button size="small" variant="outlined" sx={buttonStyle} onClick={() => handleAcitions('Half')}>
          Half
        </Button>
        <Button size="small" variant="outlined" sx={buttonStyle} onClick={() => handleAcitions('Max')}>
          Max
        </Button>
      </Box>
    </Box>
  );
}

const buttonStyle = {
  color: '#00FFAA',
  borderColor: 'rgba(0, 255, 170, 0.3)',
  borderRadius: '12px',
  fontSize: '0.75rem',
  padding: '2px 8px',
  minWidth: 'auto',
  '&:hover': { borderColor: '#00FFAA', backgroundColor: 'rgba(0, 255, 170, 0.1)' },
};

function YouPayCardBody({ selectedCrypto, setSelectedCrypto, amount, setAmount }: any) {
  const selectedCoin = cryptoList.find((c) => c.symbol === selectedCrypto);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCrypto(event.target.value);
  };

  const handleOnChangeInputValue = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setAmount(parseFloat(numericValue));
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1.5}>
      <Box display="flex" alignItems="center">
        <Box sx={{ backgroundColor: 'rgba(25, 118, 210, 0.2)', p: 1, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{selectedCoin?.icon}</Box>
        <Select value={selectedCrypto} onChange={handleChange} size="small" sx={selectStyle} IconComponent={IoIosArrowDown as any}>
          {cryptoList.map((coin) => (
            <MenuItem key={coin.symbol} value={coin.symbol} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {coin.symbol}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.5}>
        <Box>
          <input type="text" value={Number.isNaN(amount) ? '' : amount} onChange={(e) => handleOnChangeInputValue(e.target.value)} style={inputStyle} />
        </Box>
        <Typography variant="caption" color="rgba(0, 255, 170, 0.7)">
          ≈ ${Number.isNaN(amount) ? '0.00' : amount?.toFixed(1)}
        </Typography>
      </Box>
    </Box>
  );
}

const selectStyle = {
  color: '#00FFAA',
  fontWeight: 600,
  minWidth: 80,
  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
  '& .MuiSelect-icon': { color: '#00FFAA' },
  backgroundColor: 'transparent',
};

const inputStyle: any = {
  width: '150px',
  padding: '6px 10px',
  borderRadius: '8px',
  backgroundColor: 'rgba(0, 255, 170, 0.05)',
  color: '#00FFAA',
  fontWeight: 700,
  fontSize: '1.25rem',
  textAlign: 'right',
  outline: 'none',
};

function YouPayCardFooter({ selectedCrypto }: { selectedCrypto: string }) {
  const [loading, setLoading] = useState(false);
  const [cryptoPrice, setCryptoPrice] = useState<any | null>(null);

  // ✅ Fetch crypto price
  const handleFetchData = async () => {
    if (!selectedCrypto) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/crypto/currency?symbol=${selectedCrypto}`, { headers: { 'Content-Type': 'application/json' } });

      if (response?.status === 200 && response.data?.success) {
        setCryptoPrice(response?.data?.price || 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounce fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFetchData();
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedCrypto]);

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
      {loading ? (
        <>
          <Skeleton sx={{ backgroundColor: 'grey' }} variant="text" width={120} height={20} />
          <Skeleton sx={{ backgroundColor: 'grey' }} variant="text" width={120} height={20} />
        </>
      ) : (
        <>
          <Typography variant="caption" color="rgba(0, 255, 170, 0.7)">
            Balance: {cryptoPrice?.last ?? '-'} {selectedCrypto}
          </Typography>
          <Typography variant="caption" color="rgba(0, 255, 170, 0.7)">
            Last Update: {cryptoPrice?.date.split(' ')[1] ?? '-'}
          </Typography>
        </>
      )}
    </Box>
  );
}

function YouPayCardBar({ selectedCrypto, setSelectedCrypto, amount, setAmount }: any) {
  return (
    <Box width="100%" display="flex" flexDirection="column" p={2.5} sx={{ background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.3) 0%, rgba(0, 255, 255, 0.25) 100%)', borderRadius: '16px', color: '#00FFAA', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
      <YouPayCardHeader amount={amount} setAmount={setAmount} />
      <YouPayCardBody selectedCrypto={selectedCrypto} setSelectedCrypto={setSelectedCrypto} amount={amount} setAmount={setAmount} />
      <YouPayCardFooter selectedCrypto={selectedCrypto} />
    </Box>
  );
}

// ✅ You Get Card Components
function YouGetCardBody({ selectedCrypto, setSelectedCrypto, amount, setAmount, loading }: any) {
  const selectedCoin = cryptoList.find((c) => c.symbol === selectedCrypto);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCrypto(event.target.value);
    setAmount(0);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1.5}>
      <Box display="flex" alignItems="center">
        <Box sx={{ backgroundColor: 'rgba(0, 255, 170, 0.1)', p: 1, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{selectedCoin?.icon}</Box>
        <Select value={selectedCrypto} onChange={handleChange} size="small" sx={selectStyle} IconComponent={IoIosArrowDown as any}>
          {cryptoList.map((coin) => (
            <MenuItem key={coin.symbol} value={coin.symbol} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {coin.symbol}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="flex-end" gap={0.5}>
        {loading ? (
          <>
            <Skeleton sx={{ backgroundColor: 'grey' }} variant="text" width={80} height={32} />
            <Skeleton sx={{ backgroundColor: 'grey' }} variant="text" width={100} height={20} />
          </>
        ) : (
          <>
            <Typography variant="h5" fontWeight="700" color="#00FFAA">
              {Number.isNaN(amount) ? '0.00' : amount?.toFixed(3)}
            </Typography>
            <Typography variant="caption" color="rgba(0, 255, 170, 0.7)">
              ≈ ${Number.isNaN(amount) ? '0.00' : amount?.toFixed(3)}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  );
}

function YouGetCardFooter({ selectedCrypto, loading }: any) {
  const [loadingState, setLoading] = useState(false);
  const [cryptoPrice, setCryptoPrice] = useState<any | null>(null);

  // ✅ Fetch crypto price
  const handleFetchData = async () => {
    if (!selectedCrypto) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/crypto/currency?symbol=${selectedCrypto}`, { headers: { 'Content-Type': 'application/json' } });

      if (response?.status === 200 && response.data?.success) {
        setCryptoPrice(response?.data?.price || 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounce fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFetchData();
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedCrypto]);
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
      {loadingState ? (
        <>
          <Skeleton sx={{ backgroundColor: 'grey' }} variant="text" width={120} height={20} />
          <Skeleton sx={{ backgroundColor: 'grey' }} variant="text" width={120} height={20} />
        </>
      ) : (
        <>
          <Typography variant="caption" color="rgba(0, 255, 170, 0.7)">
            Balance: {cryptoPrice?.last ?? '-'} {selectedCrypto}
          </Typography>
          <Typography variant="caption" color="rgba(0, 255, 170, 0.7)">
            Last Update: {cryptoPrice?.date.split(' ')[1] ?? '-'}
          </Typography>
        </>
      )}
    </Box>
  );
}

function YouGetCardBar({ selectedCrypto, setSelectedCrypto, amount, setAmount, loading }: any) {
  return (
    <Box width="100%" display="flex" flexDirection="column" p={2.5} sx={{ background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.7) 0%, rgba(0, 255, 170, 0.2) 100%)', borderRadius: '16px', color: '#00FFAA' }}>
      <Typography variant="body2" fontWeight="600" color="#00FFAA">
        You Get
      </Typography>
      <YouGetCardBody loading={loading} selectedCrypto={selectedCrypto} setSelectedCrypto={setSelectedCrypto} amount={amount} setAmount={setAmount} />
      <YouGetCardFooter loading={loading} selectedCrypto={selectedCrypto} />
    </Box>
  );
}

// ✅ Exchange Button
function ExchangeButton({ onExchange }: { onExchange: () => void }) {
  const [toggleSwitchCrypto, setToggleSwitchCrypto] = useState(false);

  const handleChange = () => {
    setToggleSwitchCrypto(!toggleSwitchCrypto);
    onExchange();
  };

  return (
    <Box position={'relative'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} my={-1}>
      <Box position={'absolute'}>
        <IconButton size="large" onClick={handleChange} sx={{ transform: toggleSwitchCrypto ? 'rotate(90deg)' : 'rotate(270deg)', backgroundColor: '#0A1929', color: '#00FFAA', p: 1.5, borderRadius: '50%', border: '1px solid', borderColor: '#0A1929', zIndex: 2, '&:hover': { backgroundColor: '#0A1929', transition: 'transform 0.3s ease-in-out' } }}>
          <TbArrowsExchange2 size={30} style={{ transform: 'rotate(90deg)' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

// ✅ Connect Wallet
function ConnectWallet() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const wallets = [
    { name: 'MetaMask', logo: '/assets/logo/MetaMask_Fox_Logo.png' },
    { name: 'Coinbase', logo: '/assets/logo/Coinbase.png' },
    { name: 'TrustWallet', logo: '/assets/logo/trust-wallet.png' },
  ];

  const tooltip_text = 'Wallet connection is not available yet to ensure your privacy and security.';

  return (
    <Box>
      <Button onClick={handleOpen} variant="contained" fullWidth sx={{ mt: 1, py: 1.5, borderRadius: '12px', fontWeight: '600', fontSize: '1rem', textTransform: 'none', backgroundColor: '#1565C0', color: '#fff', '&:hover': { boxShadow: '0 0 10px rgba(25, 118, 210, 1)' } }}>
        Connect Wallet
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth PaperProps={{ sx: { backgroundColor: 'rgba(10, 25, 41, 1)', borderRadius: '16px', p: 2 } }}>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 3 }}>
          <Typography variant="h6" color="#1976D2" textAlign="center">
            Continue With
          </Typography>
          {wallets.map((wallet) => (
            <Button key={wallet.name} disabled variant="contained" fullWidth sx={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-start', py: 1.5, px: 2, borderRadius: '12px', textTransform: 'none', fontWeight: 600, fontSize: '1rem', color: '#fff' }}>
              <Box component="img" src={wallet.logo} alt={`${wallet.name}_Logo`} sx={{ width: 32, height: 32, borderRadius: '6px', objectFit: 'contain', backgroundColor: '#fff', p: 0.5 }} />
              <Typography variant="body1" color="#fff">
                {wallet.name}
              </Typography>
            </Button>
          ))}
          <Box sx={{ display: 'inline-block', backgroundColor: '#fff', width: '100%', height: '1px', opacity: '0.2' }} />
          <Typography variant="caption" color="rgba(0, 255, 170, 0.7)" textAlign="center" gutterBottom>
            {tooltip_text}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

// ✅ Main Card Component
export default function Cards() {
  const [loading, setLoading] = useState(false);

  // State for You Pay / You Get
  const [youPayCrypto, setYouPayCrypto] = useState('BTC');
  const [youPayAmount, setYouPayAmount] = useState(0);

  const [youGetCrypto, setYouGetCrypto] = useState('ETH');
  const [youGetAmount, setYouGetAmount] = useState(0);

  // ✅ Swap cryptos + amounts
  const handleExchange = () => {
    setYouPayCrypto(youGetCrypto);
    setYouGetCrypto(youPayCrypto);

    setYouPayAmount(youGetAmount);
    setYouGetAmount(youPayAmount);
  };

  // ✅ Fetch conversion result
  const handleFetchData = async () => {
    if (!youPayAmount || youPayAmount <= 0) return;

    try {
      setLoading(true);
      const response = await axiosInstance.get(`/api/crypto/calculate?from=${youPayCrypto}&to=${youGetCrypto}&amount=${youPayAmount}`, { headers: { 'Content-Type': 'application/json' } });

      if (response?.status === 200) {
        setYouGetAmount(response.data?.convertedAmount || 0);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Debounce user input before fetching
  useEffect(() => {
    const timer = setTimeout(() => {
      handleFetchData();
    }, 800);

    return () => clearTimeout(timer);
  }, [youPayCrypto, youGetCrypto, youPayAmount]);

  return (
    <Box width="100%" display="flex" flexDirection="column" gap={2}>
      <YouPayCardBar selectedCrypto={youPayCrypto} setSelectedCrypto={setYouPayCrypto} amount={youPayAmount} setAmount={setYouPayAmount} />
      <ExchangeButton onExchange={handleExchange} />
      <YouGetCardBar selectedCrypto={youGetCrypto} setSelectedCrypto={setYouGetCrypto} amount={youGetAmount} setAmount={setYouGetAmount} loading={loading} />
      <ConnectWallet />
      <Status fromCrypto={youPayCrypto} toCrypto={youGetCrypto} />
      <Footer loading={loading} fromSelectedCrypto={youPayCrypto} toSelectedCrypto={youGetCrypto} cryptoList={cryptoList} />
    </Box>
  );
}
