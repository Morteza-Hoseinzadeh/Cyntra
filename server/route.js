// server/route.js
const express = require('express');
const router = express.Router();

// Import route handlers from separate files
const crypto = require('./routes/cryptos/route');
const tokenGenerator = require('./routes/token/route');

router.use('/crypto', crypto);
router.use('/auth/provider', tokenGenerator);

module.exports = router;
