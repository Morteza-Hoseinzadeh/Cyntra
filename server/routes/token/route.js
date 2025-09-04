const express = require('express');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { db } = require('../../models/firebase');
const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || 'your-secret-key';

// Generate token + save user in RTDB
router.post('/init', async (req, res) => {
  const user_id = uuidv4();
  const token = jwt.sign({ user_id }, SECRET_KEY, { expiresIn: '1h' });

  try {
    await db.ref('users/' + user_id).set({ id: user_id, role: 'guest', createdAt: Date.now() });

    return res.status(200).json({ success: true, user_id, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Failed to save user' });
  }
});

// Get user info
router.get('/user/:id', async (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ success: false, message: 'No token provided' });

  const token = authHeader.split(' ')[1];

  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    if (decoded.user_id !== req.params.id) return res.status(403).json({ success: false, message: 'User ID mismatch' });

    try {
      const snapshot = await db.ref('users/' + decoded.user_id).once('value');
      const user = snapshot.val();

      if (!user) return res.status(404).json({ success: false, message: 'User not found' });

      return res.status(200).json({ success: true, user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: 'Failed to fetch user' });
    }
  });
});

module.exports = router;
