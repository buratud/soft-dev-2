import express from 'express';
import { BASE_SERVER_PATH, PORT } from './config';

const app = express.Router();

express().use(app).listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} at ${BASE_SERVER_PATH}`);
});
