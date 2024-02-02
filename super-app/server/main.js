const express = require('express');
const { PORT } = require('./config');

const app = express();
const api = express.Router();
app.use('/api', api)

api.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});