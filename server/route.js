// server/route.js
const express = require('express');
const router = express.Router();

// Import route handlers from separate files
const crypto = require('./api/cryptos/route');
const tokenGenerator = require('./api/token/route');

router.use('/crypto', crypto);
router.use('/auth/provider', tokenGenerator);

module.exports = { router };
