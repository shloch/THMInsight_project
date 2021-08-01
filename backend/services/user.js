const shajs = require('sha.js');
const db = require('../sql/db');

const SECRET = process.env.SECRET || 'test-dev-secret';
/**
 * Generate hash password
 * Generate online: https://emn178.github.io/online-tools/sha256.html
 * @param {string} email
 * @param {string} password
 */
const hashPassword = (email, password) => shajs('sha256').update(`${email}${password}${SECRET}`).digest('hex');

const authenticateUser = async (email, password) => {
  const hash = hashPassword(email, password);
  const queryText = {
    text: ` SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName
              FROM users s
              WHERE email = $1 AND password = $2`,
    values: [email, hash],
  };
  try {
    const { rows } = await db.query(queryText);
    if (rows[0]) {
      const user = rows[0];
      return user;
    }
    throw (new Error('Bad credentials'));
  } catch (error) {
    throw (new Error('Bad credentials'));
  }
};

// id SERIAL PRIMARY KEY,
//   email TEXT UNIQUE,
//   password TEXT,
//   first_name TEXT,
//   last_name TEXT,
//   country TEXT,
//   city TEXT,
//   phone_number TEXT,
//   position TEXT,
const addNewUser = (firstName, lastName, email, country, city, phone, password) => {
  const hash = hashPassword(email, password);
  const DEFAULT_POSITION = 'Ile de France';
  const queryString = `INSERT INTO users
  (email, password, first_name, last_name, country, city, phone_number, position)
  VALUES
  ('${email}', '${hash}', '${firstName}', '${lastName}', '${country}', '${city}', '${phone}', '${DEFAULT_POSITION}')`;

  db.query(queryString, (err, res) => {
    if (err !== undefined) {
      // log the error to console
      console.log('Postgres INSERT error:', err);

      // get the keys for the error
      const keys = Object.keys(err);
      console.log('\nkeys for Postgres error:', keys);

      // get the error position of SQL string
      console.log('Postgres error position:', err.position);
    }

    // check if the response is not 'undefined'
    if (res !== undefined) {
      // log the response to console
      console.log('Postgres response:', res);

      // get the keys for the response object
      const keys = Object.keys(res);

      // log the response keys to console
      console.log('\nkeys type:', typeof keys);
      console.log('keys for Postgres response:', keys);

      if (res.rowCount > 0) {
        console.log('# of records inserted:', res.rowCount);
      } else {
        console.log('No records were inserted.');
      }
    }
  });
};

module.exports = {
  authenticateUser,
  addNewUser,
};
