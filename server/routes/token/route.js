// routes/token/route.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY || '35eed3d46ebbc0cc36b675ea0f4fcc65422ca4f777b3b2338949f0a32f60207b';

// ✅ Generate token + random user_id
router.post('/init', (req, res) => {
  const user_id = uuidv4();
  const token = jwt.sign({ user_id }, SECRET_KEY, { expiresIn: '1h' });

  return res.status(200).json({ success: true, user_id, token });
});

// ✅ Verify + return user info
router.get('/user/:id', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ success: false, message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Invalid or expired token' });

    if (decoded.user_id !== req.params.id) {
      return res.status(403).json({ success: false, message: 'User ID mismatch' });
    }

    // here you could load extra info from DB if needed
    const user = { id: decoded.user_id, role: 'guest' };

    return res.status(200).json({ success: true, user });
  });
});

module.exports = router;
