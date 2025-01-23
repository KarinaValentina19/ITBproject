const express = require('express');
const { general } = require('./config');
const app = express();
require('dotenv').config();

app.use(express.json());

app.use('/bridge', require('./bridge'));

app.listen(general.port, () => {
  console.log(`Server running on port ${general.port} in ${general.nodeEnv} mode`);
});
