// load .env data into process.env
require('dotenv').config();

const db = require('./db/connection');
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const PORT = 8080;

// Express Configuration
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieSession({
  name: process.env.SESSION_NAME,
  keys: [process.env.SESSION_KEY]
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));

// Routes
const userRoutes = require('./routes/users');
app.use('/', userRoutes(db));


app.listen(PORT, () => {
  console.log(`Express is listening on port ${PORT}!`);
});
