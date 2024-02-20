const express = require('express');

const app = express.Router();

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My second Sentry error!");
});

//-----------------------------Blogger-----------------------------------

app.post('/blogger_list', async (req, res) => {
    try {
      const { data, error } = await supabase
        .from('blogger')
        .select('*')
      if (error) {
        throw error;
      } else {
        res.status(200).json(data);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })
  
  // api.post('/search_blogger', async (req, res) => {
  //   try {
  //     const { data, error } = await supabase
  //       .from('blog.blog')
  //       .select('users(id)')
  //     if (error) {
  //       console.log(error)
  //       throw error;
  //     } else {
  //       res.status(200).json(data);
  //     }
  //   } catch (err) {
  //     console.log(err)
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // })

module.exports = app;