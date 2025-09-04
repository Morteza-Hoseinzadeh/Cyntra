const admin = require('firebase-admin');

const serviceAccount = require('./admin-sdk-firebase/currency-convertor-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://currency-convertor-3adbf-default-rtdb.firebaseio.com',
});

const db = admin.database();

module.exports = { db };
