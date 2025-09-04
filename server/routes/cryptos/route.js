const express = require('express');
const axios = require('axios');
const router = express.Router();

const { verifyToken } = require('../../middlewares/auth/auth'); // optional

router.get('/', async (req, res) => {
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

module.exports = router;
