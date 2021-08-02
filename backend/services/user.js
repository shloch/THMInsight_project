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
  console.log(hash);
  const queryText = {
    text: ` SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName, s.city as city,
    s.phone_number as phone, s.country as country
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

const addNewUser = (firstName, lastName, email, country, city, phone, password) => {
  const hash = hashPassword(email, password);
  const DEFAULT_POSITION = 'Ile de France';
  const queryString = `INSERT INTO users
  (email, password, first_name, last_name, country, city, phone_number, position)
  VALUES
  ('${email}', '${hash}', '${firstName}', '${lastName}', '${country}', '${city}', '${phone}', '${DEFAULT_POSITION}')`;

  db.query(queryString, (err, res) => {
    if (err !== undefined) {
      console.log('Postgres INSERT error:', err);

      console.log('Postgres error position:', err.position);
    }

    if (res !== undefined) {
      console.log('Postgres response:', res);
      if (res.rowCount > 0) {
        console.log('# of records inserted:', res.rowCount);
        return 'SUCCESS';
      }
      console.log('No records were inserted.');
      return 'FAIL';
    }
  });
};

const editUserData = (firstName, lastName, email, country, city, phone, password, id) => {
  const hash = hashPassword(email, password);
  const queryString = `UPDATE users
  SET email = '${email}',
      password = '${hash}',
      first_name = '${firstName}',
      last_name = '${lastName}',
      country = '${country}',
      city = '${city}',
      phone_number = '${phone}'
  WHERE id = ${id}`;

  db.query(queryString, (err, res) => {
    if (err !== undefined) {
      console.log('Postgres INSERT error:', err);

      const keys = Object.keys(err);
      console.log('\nkeys for Postgres error:', keys);

      console.log('Postgres error position:', err.position);
    }

    if (res !== undefined) {
      console.log('Postgres response:', res);

      if (res.rowCount > 0) {
        console.log('# of records inserted:', res.rowCount);
        return 'SUCCESS';
      }
      console.log('No records were updated.');
      return 'FAIL';
    }
  });
};
module.exports = {
  authenticateUser,
  addNewUser,
  editUserData,
};
