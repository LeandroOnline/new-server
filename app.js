const cors = require('cors');
const express = require ('express');
const app = express();

app.use(cors());
app.use(express.json())

//routes
app.use('/api', require('./routes/api.js'));

module.exports = app;