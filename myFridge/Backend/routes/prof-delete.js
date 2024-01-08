const express = require('express');
const router = express.Router();

const database = require('../shared/database');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');
require('dotenv').config({ path: __dirname + '../../../.env' });

// DELETE endpoint to delete a user profile
router.delete('/', async (req, res, next) => {
  const tokenInput = req.headers.authorization;
  var user_id = req.query.user_id
  console.log("3333333333333333333333333333333", user_id);
  var tokenContent = tokenInput.split(" ")[1];

  jwt.verify(tokenContent, process.env.JWT_SIGN_SECRET, async (err, data) => {
    if (err) {
      return res.status(401).send({
        ok: false, error: 'Unauthorized Request'
      });
    }

    try {
      const updateQuery = {
        query: 'DELETE FROM user_info WHERE user_id = ?',
        values: [user_id]
      };
    
      const userData = await database.executeQuery(updateQuery);

      if ('error' in userData) {
        return res.status(500).send({
          ok: false,
          error: 'An error occurred while deleting the account.'
        });
      }

      // Delete Token
    
      return res.status(200).send({
        ok: true,
        data: userData
      });
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        ok: false, error: 'Internal Server Error'
      });
    }
  });
});

module.exports = router;
