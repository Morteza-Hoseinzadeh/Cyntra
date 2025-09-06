import React, { useEffect, useState } from 'react';
import { Box, Typography, Skeleton } from '@mui/material';
import axiosInstance from '@/utils/hooks/axiosInstance';

export default function Status({ fromCrypto, toCrypto }: { fromCrypto: string; toCrypto: string }) {
  const [loading, setLoading] = useState(true);
  const [statusData, setStatusData] = useState<any>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);

      const [rateRes, fromInfo, toInfo] = await Promise.all([axiosInstance.get(`/api/crypto/status/rate?from=${fromCrypto}&to=${toCrypto}`), axiosInstance.get(`/api/crypto/status/info?symbol=${fromCrypto}`), axiosInstance.get(`/api/crypto/status/info?symbol=${toCrypto}`)]);

      const fromSymbol = fromInfo?.data?.data?.symbols?.[0];
      const toSymbol = toInfo?.data?.data?.symbols?.[0];

      setStatusData({
        exchangeRate: `1 ${fromCrypto} = ${rateRes?.data?.rate?.toFixed(5)} ${toCrypto}`,
        networkFee: `${fromSymbol?.lowest} ${fromCrypto} + ${toSymbol?.lowest} ${toCrypto}`,
        bitcoin: `${fromSymbol?.highest} ${fromCrypto}`,
        ethereum: `${toSymbol?.highest} ${toCrypto}`,
        maxTotal: `${fromSymbol?.last} ${fromCrypto}`,
      });
    } catch (error) {
      console.error('Error fetching status data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [fromCrypto, toCrypto]);

  return (
    <Box mb={12} display="flex" flexDirection="column" gap={2} sx={{ color: '#fff', border: '1px solid rgba(25, 118, 210, 1)', borderRadius: '18px', p: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      {loading ? (
        <Box width={'100%'} display="flex" flexDirection="column" gap={2}>
          {[...Array(5)].map((_, i) => (
            <Box key={i} display="flex" justifyContent="space-between" gap={2}>
              <Skeleton sx={{ backgroundColor: 'grey' }} variant="rounded" width="1000px" height={28} />
              <Skeleton sx={{ backgroundColor: 'grey' }} variant="rounded" width="1000px" height={28} />
            </Box>
          ))}
        </Box>
      ) : (
        statusData && (
          <>
            <Box display="flex" justifyContent="space-between">
              <Typography>Exchange Rate</Typography>
              <Typography>{statusData.exchangeRate}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Network Fee</Typography>
              <Typography>{statusData.networkFee}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>{fromCrypto}</Typography>
              <Typography>{statusData.bitcoin}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>{toCrypto}</Typography>
              <Typography>{statusData.ethereum}</Typography>
            </Box>
            <Box sx={{ backgroundColor: '#fff', width: '100%', height: '1px', opacity: 0.2 }} />
            <Box display="flex" justifyContent="space-between">
              <Typography>Max Total</Typography>
              <Typography>{statusData.maxTotal}</Typography>
            </Box>
          </>
        )
      )}
    </Box>
  );
}
