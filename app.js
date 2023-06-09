const cors = require('cors');
const express = require ('express');
const cookieParser = require ('cookie-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('/api', require('./routes/api.js'));

module.exports = app;