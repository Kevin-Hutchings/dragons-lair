require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const {
   register,
   login,
   logout,
} = require('./controllers/authController');

const { CONNECTION_STRING, SERVER_PORT, SESSION_SECRET } = process.env;

const app = express();

app.use(express.json());
app.use(
   session({
      resave: true,
      saveUninitialized: false,
      secret: SESSION_SECRET,
   })
);

massive({
   connectionString: CONNECTION_STRING,
   ssl: { rejectUnauthorized: false }
})
.then(dbInstance => {
   app.set('db', dbInstance);
   console.log('Database connection successful!');
})
.catch(err => console.log(err));

app.post('/auth/register', register);
app.post('/auth/login', login);
app.get('/auth/logout', logout);

app.listen(SERVER_PORT, () => console.log(`Listening on Port ${SERVER_PORT}`));