const bcrypt = require('bcryptjs');

const passcode = 'pass124'; // The passcode you want to hash
bcrypt.hash(passcode, 10).then((hash) => {
  console.log('Hashed passcode:', hash);
});
