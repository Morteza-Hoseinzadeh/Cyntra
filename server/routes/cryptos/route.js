const express = require('express');
const router = express.Router();

// Import route handlers from separate files
const first_slot = require('./fisrt-slot/route');
const second_slot = require('./second-slot/route');

router.use('/first-slot', first_slot);
router.use('/second-slot', second_slot);

module.exports = router;
