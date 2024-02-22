const express = require('express');

const app = express.Router();

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My second Sentry error!");
});

module.exports = app;