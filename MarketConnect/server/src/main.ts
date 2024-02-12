import express from 'express';
import { BASE_SERVER_PATH, PORT } from './config';

const app = express.Router();

app.get('/best-sellers', (req, res) => {
    return res.status(200).json({ "message": "Hello, world!" });
});

app.get('/new-arrivals', (req, res) => {
    return res.status(200).json({ "message": "Hello, world!" });
});

app.get('/products', (req, res) => {
    return res.status(200).json({ "message": "Hello, world!" });
});

app.get('/products/:id', (req, res) => {
    return res.status(200).json({ "message": "Hello, world!" });
});

app.post('/products', (req, res) => {
    return res.status(200).json({ "message": "Hello, world!" });
})

express().use(app).listen(PORT, () => {
    console.log(`Server is listening on port ${PORT} at ${BASE_SERVER_PATH}`);
});
