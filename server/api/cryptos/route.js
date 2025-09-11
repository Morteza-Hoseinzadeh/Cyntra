const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/calculate', async (req, res) => {
  const { from, to, amount } = req.query;

  if (!from || !to || !amount || isNaN(amount)) {
    return res.status(400).json({ success: false, message: 'Invalid request' });
  }

  try {
    const url = `https://api.freecryptoapi.com/v1/getConversion?from=${from}&to=${to}&amount=${amount}`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.FREE_CRYPTO_API_KEY}` },
    });

    const data = response.data;

    if (typeof data.result !== 'number') {
      return res.status(500).json({ success: false, message: 'Conversion failed' });
    }

    const convertedAmount = data.result * 0.99; // optional 1% fee

    return res.status(200).json({ success: true, convertedAmount });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ success: false, message: 'Error fetching conversion' });
  }
});

router.get('/status/rate', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).json({ success: false, message: 'Invalid request' });

  try {
    const url = `https://api.freecryptoapi.com/v1/getConversion?from=${from}&to=${to}&amount=1`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.FREE_CRYPTO_API_KEY}` },
    });

    return res.status(200).json({ success: true, rate: response.data?.result || 0 });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ success: false, message: 'Error fetching exchange rate' });
  }
});

router.get('/status/info', async (req, res) => {
  const { symbol } = req.query;
  if (!symbol) return res.status(400).json({ success: false, message: 'Invalid request' });

  try {
    const url = `https://api.freecryptoapi.com/v1/getData?symbol=${symbol}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.FREE_CRYPTO_API_KEY}` },
    });

    return res.status(200).json({ success: true, data: response.data });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ success: false, message: 'Error fetching coin info' });
  }
});

router.get('/currency', async (req, res) => {
  const { symbol } = req.query;

  if (!symbol) {
    return res.status(400).json({ success: false, message: 'Invalid request' });
  }

  try {
    const url = `https://api.freecryptoapi.com/v1/getData?symbol=${symbol}`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.FREE_CRYPTO_API_KEY}` },
    });

    const data = response.data;

    // ✅ Send back normalized data
    if (response.status !== 200 || !data?.symbols || !Array.isArray(data.symbols) || data.symbols.length === 0) {
      return res.status(500).json({ success: false, message: 'Failed to fetch currency data' });
    }

    return res.status(200).json({ success: true, price: data?.symbols[0] });
  } catch (err) {
    console.error(err.response?.data || err.message);
    return res.status(500).json({ success: false, message: 'Error fetching conversion' });
  }
});

module.exports = router;
