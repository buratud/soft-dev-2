const express = require('express');
const { PORT } = require('./config');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});