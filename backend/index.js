const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morganMiddleware = require('./middelware/logger');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const User = require('./services/user');

const port = 3002;

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(morganMiddleware);

app.post('/addUserData', (request, response) => {
  console.log(request.body);
  const {
    firstName, lastName, email, country, city, phone, password,
  } = request.body;
  User.addNewUser(firstName, lastName, email, country, city, phone, password);
});

app.post('/editUserData/:userID', (request, response) => {
  const { userID } = request.params;
  const {
    firstName, lastName, email, country, city, phone, password,
  } = request.body;
  const uu = User.editUserData(firstName, lastName, email, country, city, phone, password, userID);
  console.log(`uu = ${uu}`);
});

app.post('/authenticate', (request, response) => {
  console.log(request.body);
  const {
    email, password,
  } = request.body;
  const res = User.authenticateUser(email, password);
  res.then((data) => {
    response.send(data);
  });
});

app.get('/health', (req, res) => res.send({ message: 'ok' }));

const server = app.listen(port, () => {
  console.log(`THM App running on port ${port}.`);
});
module.exports = server;
