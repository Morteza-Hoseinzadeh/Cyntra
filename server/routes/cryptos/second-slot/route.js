const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Second slot');
});

module.exports = router;
