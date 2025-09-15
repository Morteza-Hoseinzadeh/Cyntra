'use client';

import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, MenuItem, Select, Typography, SelectChangeEvent, Dialog, DialogContent, Skeleton } from '@mui/material';

import { SiAlgorand, SiBinance, SiBitcoin, SiBitcoincash, SiCardano, SiChainlink, SiDogecoin, SiEthereum, SiLitecoin, SiMonero, SiPolkadot, SiPolygon, SiRipple, SiSolana, SiStellar, SiTether } from 'react-icons/si';
import { IoIosArrowDown } from 'react-icons/io';
import { TbArrowsExchange2, TbSearch } from 'react-icons/tb';
import { FaArrowTrendUp } from 'react-icons/fa6';

import axiosInstance from '@/utils/hooks/axiosInstance';

import Footer from '../footer/footer';
import Status from '../statues/status';
import CustomDialog from '../custom/CustomDialog';

const cryptoList = [
  { symbol: 'BTC', name: 'Bitcoin', icon: <SiBitcoin size={32} /> },
  { symbol: 'ETH', name: 'Ethereum', icon: <SiEthereum size={32} /> },
  { symbol: 'USDT', name: 'Tether', icon: <SiTether size={32} /> },
  { symbol: 'BNB', name: 'Binance Coin', icon: <SiBinance size={32} /> },
  { symbol: 'ADA', name: 'Cardano', icon: <SiCardano size={32} /> },
  { symbol: 'SOL', name: 'Solana', icon: <SiSolana size={32} /> },
  { symbol: 'XRP', name: 'Ripple', icon: <SiRipple size={32} /> },
  { symbol: 'DOT', name: 'Polkadot', icon: <SiPolkadot size={32} /> },
  { symbol: 'DOGE', name: 'Dogecoin', icon: <SiDogecoin size={32} /> },
  { symbol: 'MATIC', name: 'Polygon', icon: <SiPolygon size={32} /> },
  { symbol: 'LTC', name: 'Litecoin', icon: <SiLitecoin size={32} /> },
  { symbol: 'LINK', name: 'Chainlink', icon: <SiChainlink size={32} /> },
  { symbol: 'XLM', name: 'Stellar', icon: <SiStellar size={32} /> },
  { symbol: 'ALGO', name: 'Algorand', icon: <SiAlgorand size={32} /> },
  { symbol: 'BCH', name: 'Bitcoin Cash', icon: <SiBitcoincash size={32} /> },
  { symbol: 'XMR', name: 'Monero', icon: <SiMonero size={32} /> },
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

function YouPayCardBody({ selectedCrypto, setSelectedCrypto, convertedSelectedCrypto, amount, setAmount }: any) {
  const [openModal, setOpenModal] = useState<any>(true);

  const selectedCoin = cryptoList.find((c) => c.symbol === selectedCrypto && c.symbol !== convertedSelectedCrypto);

  const handleSelectCoin = (coin: any) => {
    setSelectedCrypto(coin.symbol);
    setOpenModal(false);
  };

  const handleOpenModal = () => setOpenModal(!openModal);

  const handleOnChangeInputValue = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setAmount(parseFloat(numericValue));
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="space-between" mt={1.5}>
        <Box display="flex" alignItems="center">
          <Box sx={{ backgroundColor: 'rgba(25, 118, 210, 0.2)', p: 1, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{selectedCoin?.icon}</Box>
          <Button variant="outlined" sx={{ color: '#00FFAA', borderColor: '#00FFAA', borderRadius: '16px', fontSize: '1rem', fontWeight: 600, textTransform: 'none', ml: 1, px: 2, minWidth: 'auto', '&:hover': { backgroundColor: 'transparent' } }} endIcon={<IoIosArrowDown size={20} />} onClick={handleOpenModal}>
            {selectedCrypto}
          </Button>
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

      <CustomDialog open={openModal} onClose={handleOpenModal} maxWidth="xs" title={'Select a token'}>
        <Box position={'relative'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'} mb={3}>
          <input type="text" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', width: '100%', textAlign: 'left', fontWeight: 'normal', fontSize: '1rem', padding: '12px', paddingLeft: '48px', borderRadius: '16px', color: '#fff' }} placeholder="Search token ..." />
          <Box position={'absolute'} left={16}>
            <TbSearch size={20} style={{ color: 'rgba(255, 255, 255, 0.5)' }} />
          </Box>
          <Box position={'absolute'} right={16} sx={{ cursor: 'pointer' }}>
            <Box display={'flex'} alignContent={'center'} justifyContent={'center'} gap={1}>
              <img src="/assets/icon/all-networks-icon.png" alt="all-networks-icon.png" style={{ width: 25, height: 25 }} />
              <Box mt={0.4}>
                <IoIosArrowDown size={20} color="#fff" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={1} mb={3}>
          {cryptoList?.slice(0, 5).map((coin, index) => (
            <Box key={index} sx={{ width: '100%', backgroundColor: '#004BA0', color: '#fff', p: 1, borderRadius: '16px', textAlign: 'center', cursor: 'pointer', transition: 'all ease 0.1s', '&:hover': { backgroundColor: '#1565C0' } }} onClick={() => handleSelectCoin(coin)}>
              <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                {coin.icon}
              </Box>
              <Typography variant="caption" color="#fff">
                {coin.symbol}
              </Typography>
            </Box>
          ))}
        </Box>
        <Box width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'left'} gap={1} color={'rgba(255,255,255,0.5)'}>
          <FaArrowTrendUp />
          <Typography variant="body2">Tokens by 24H volume</Typography>
        </Box>
      </CustomDialog>
    </>
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

function YouPayCardBar({ selectedCrypto, setSelectedCrypto, convertedSelectedCrypto, amount, setAmount }: any) {
  return (
    <Box width="100%" display="flex" flexDirection="column" p={2.5} sx={{ background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.3) 0%, rgba(0, 255, 255, 0.25) 100%)', borderRadius: '16px', color: '#00FFAA', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
      <YouPayCardHeader amount={amount} setAmount={setAmount} />
      <YouPayCardBody convertedSelectedCrypto={convertedSelectedCrypto} selectedCrypto={selectedCrypto} setSelectedCrypto={setSelectedCrypto} amount={amount} setAmount={setAmount} />
      <YouPayCardFooter selectedCrypto={selectedCrypto} />
    </Box>
  );
}

// ✅ You Get Card Components
function YouGetCardBody({ selectedCrypto, setSelectedCrypto, convertedSelectedCrypto, amount, setAmount, loading }: any) {
  const [openModal, setOpenModal] = useState<Boolean>(false);

  const selectedCoin = cryptoList.find((c) => c.symbol === selectedCrypto && c.symbol !== convertedSelectedCrypto);

  const handleOpenModal = () => setOpenModal(!openModal);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCrypto(event.target.value);
    setAmount(0);
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" mt={1.5}>
      <Box display="flex" alignItems="center">
        <Box sx={{ backgroundColor: 'rgba(0, 255, 170, 0.1)', p: 1, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>{selectedCoin?.icon}</Box>
        <Button variant="outlined" sx={{ color: '#00FFAA', borderColor: '#00FFAA', borderRadius: '16px', fontSize: '1rem', fontWeight: 600, textTransform: 'none', ml: 1, px: 2, minWidth: 'auto', '&:hover': { backgroundColor: 'transparent' } }} endIcon={<IoIosArrowDown size={20} />} onClick={handleOpenModal}>
          {selectedCrypto}
        </Button>
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

function YouGetCardBar({ selectedCrypto, setSelectedCrypto, convertedSelectedCrypto, amount, setAmount, loading }: any) {
  return (
    <Box width="100%" display="flex" flexDirection="column" p={2.5} sx={{ background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.7) 0%, rgba(0, 255, 170, 0.2) 100%)', borderRadius: '16px', color: '#00FFAA' }}>
      <Typography variant="body2" fontWeight="600" color="#00FFAA">
        You Get
      </Typography>
      <YouGetCardBody convertedSelectedCrypto={convertedSelectedCrypto} loading={loading} selectedCrypto={selectedCrypto} setSelectedCrypto={setSelectedCrypto} amount={amount} setAmount={setAmount} />
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
        <IconButton size="large" onClick={handleChange} sx={{ transform: toggleSwitchCrypto ? 'rotate(180deg)' : 'rotate(360deg)', backgroundColor: '#0A1929', color: '#00FFAA', p: 1.5, borderRadius: '50%', border: '1px solid', borderColor: '#0A1929', zIndex: 2, '&:hover': { backgroundColor: '#0A1929', transition: 'transform 0.3s ease-in-out' } }}>
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
      <YouPayCardBar selectedCrypto={youPayCrypto} convertedSelectedCrypto={youGetCrypto} setSelectedCrypto={setYouPayCrypto} amount={youPayAmount} setAmount={setYouPayAmount} />
      <ExchangeButton onExchange={handleExchange} />
      <YouGetCardBar selectedCrypto={youGetCrypto} convertedSelectedCrypto={youPayCrypto} setSelectedCrypto={setYouGetCrypto} amount={youGetAmount} setAmount={setYouGetAmount} loading={loading} />
      <ConnectWallet />
      <Status fromCrypto={youPayCrypto} toCrypto={youGetCrypto} />
      <Footer loading={loading} fromSelectedCrypto={youPayCrypto} toSelectedCrypto={youGetCrypto} cryptoList={cryptoList} />
    </Box>
  );
}
