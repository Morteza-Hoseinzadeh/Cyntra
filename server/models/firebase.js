const admin = require('firebase-admin');

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_JSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://currency-convertor-3adbf-default-rtdb.firebaseio.com',
});

const db = admin.database();

module.exports = { db };
