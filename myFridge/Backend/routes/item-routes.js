const express = require('express');
const router = express.Router();
const database = require('../shared/database');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res, next) => {
  const tokenInput = req.headers.authorization;
  var tokenContent = tokenInput.split(" ")[1];

  jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
    if (err) {
      return res.status(401).send({
        ok: false, error: 'Unauthorized Request'
      });
    }

    let query = 'SELECT item_name, expiry_date, quantity, item_picture FROM items_info WHERE user_id = ?';
    const sortingCriterion = req.query.sort; // Get the sorting criterion from query parameters

    // Append the ORDER BY clause based on the sorting criterion
    if (sortingCriterion === 'expire') {
      query += ' ORDER BY expiry_date ASC';
    } else if (sortingCriterion === 'recently') {
      query += ' ORDER BY time_added DESC';
    } else if (sortingCriterion === 'qtyup') {
      query += ' ORDER BY quantity ASC';
    } else if (sortingCriterion === 'qtydown') {
      query += ' ORDER BY quantity DESC';
    } else {
      query += ' ORDER BY item_name ASC'; // Default sorting is by name
    }

    const itemData = await database.executeQuery({
      query,
      values: [data.user_id]
    });

    if ('error' in itemData) {
      return res.status(500).send({
        ok: false, error: itemData.error.userError
      });
    }

    return res.json(
      {
        ok: true,
        number: 123,
        data: itemData
      }
    );
  });
});

module.exports = router;
