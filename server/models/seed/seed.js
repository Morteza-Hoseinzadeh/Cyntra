const connection = require('../dbConnection');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const SECRET_KEY = '35eed3d46ebbc0cc36b675ea0f4fcc65422ca4f777b3b2338949f0a32f602077';

const id = uuidv4();
const user_id = uuidv4();
const token = jwt.sign({ user_id }, SECRET_KEY, { expiresIn: '365d' });

connection.query('', [], (err, results) => {});
