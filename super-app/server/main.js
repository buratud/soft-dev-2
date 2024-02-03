const express = require('express');
const { PORT } = require('./config');
const { BASE_SERVER_PATH } = require('./config');
const app = express();
const api = express.Router();
app.use(BASE_SERVER_PATH, api)

api.get('/', (req, res) => {
  res.send(JSON.stringify(req));
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});