require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const {
   register,
   login,
} = require('./controllers/authController');

const { CONNECTION_STRING, SESSION_SECRET } = process.env;

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
.catch(e => console.log(e));

app.post('/auth/register', register);
app.post('/auth/login', login)

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));