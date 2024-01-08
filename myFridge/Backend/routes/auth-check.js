const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req?.session?.userData) {
        return res.status(401).send({ ok: false });
    }

    if (Object.keys(req.session.userData).length == 0) {
        return res.status(401).send({ ok: false });
    }

    return res.send({ ok: true, data: req.session.userData });
});

module.exports = router;