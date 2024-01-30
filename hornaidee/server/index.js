const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwtKey = "krit9354";
const { Server } = require('socket.io');
const http = require("http");
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, PORT, WEB_URL } = require("./config");
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: MYSQL_USER,
  host: MYSQL_HOST,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
  multipleStatements: true,
});


// app.listen(3001, () => {
//   console.log("Yey, your server is running on port 3001");
// });

const server = http.createServer(app);

//socket
const io = new Server(server, {
  cors: {
    origin: WEB_URL,
    methods: ["GET", "POST"],
  }
})
io.on("disconnection", (socket) => { console.log("disconnect") })

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("join_ticket", (data) => {
    console.log(data)
    socket.join("ticket" + data)
  });

  socket.on("join_chanel", (data) => {
    socket.join(data)
  });

  socket.on("send message", (data) => {
    console.log(data);
    db.query(
      "INSERT INTO chat (chanel_id, sender_id, receiver_id, message_text) VALUES(?,?,?,?)",
      [data.chanel, data.sender_id, data.receiver_id, data.message],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          db.query(
            `SELECT chat.*,sender.user_name as sender,receiver.user_name as receiver FROM chat
            join user_data as sender on chat.sender_id = sender.id
            join user_data as receiver on chat.receiver_id = receiver.id
            WHERE chanel_id = ?
            ORDER BY time ASC;
          `,
            [data.chanel],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                socket.to(data.chanel).emit("receive_message", result)
                console.log(data.chanel)
              }
            }
          );
        }
      }
    );

  })

  socket.on("send ticket message", (data) => {
    db.query(
      "INSERT INTO ticket_message (ticket_id, sender_id, receiver_id, message_text) VALUES(?,?,?,?)",
      [data.ticket_id, data.sender_id, data.receiver_id, data.message],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          db.query(
            `SELECT ticket_message.*,sender.user_name as sender,receiver.user_name as receiver FROM ticket_message
            join user_data as sender on ticket_message.sender_id = sender.id
            join user_data as receiver on ticket_message.receiver_id = receiver.id
              WHERE ticket_id = ?
              ORDER BY time ASC;`,
            [data.ticket_id],
            (err, result) => {
              console.log(result)
              if (typeof result == "undefined") {
                socket.to("ticket" + data.ticket_id).emit("receive message ticket", "")
              } else {
                socket.to("ticket" + data.ticket_id).emit("receive message ticket", result)
              }
            }
          );
        }
      }
    );
  })

});

//server
server.listen(PORT, () => {
  console.log(`Yey, your server is running on port ${PORT}`);
});

// App (get)
app.get("/", (req, res) => {
  db.query("SELECT* FROM dorm_detail", (err, result) => {
    res.send(result);
  });
});

//filter(get)
app.get("/filter", (req, res) => {
  console.log(req.query)
  db.query(`SELECT * FROM dorm_detail 
  WHERE min_price >= ? and max_price <= ?
  and  distance >= ? and distance <= ?;`,
    [req.query.minPrice, req.query.maxPrice, req.query.minDistance, req.query.maxDistance],
    (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(result);
      }
    })
})

// Dorm Detail (get)
app.get("/detail/:dormID", (req, res) => {
  db.query(
    `SELECT* FROM dorm_detail
            JOIN facility ON dorm_detail.dorm_id = facility.dorm_id
            JOIN safety ON dorm_detail.dorm_id = safety.dorm_id
            WHERE dorm_detail.dorm_id = ?`,
    [req.params.dormID],
    (err, result) => {
      if (typeof result[0] == "undefined") {
        res.status(404).send();
      } else {
        res.send(result[0]);
      }
    }
  );
});

//review (get)
app.get("/review/:dormID", (req, res) => {
  db.query(`
  SELECT review.*,writer.user_name as writer FROM review 
join user_data as writer on review.writer_id = writer.id
WHERE  dorm_id = ?;
  `,
    [req.params.dormID],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  )
})

//review (post)
app.post("/write_review", (req, res) => {
  const dorm_id = req.body.dorm_id
  const writer_id = req.body.writer_id
  const star = req.body.star
  const comment = req.body.comment
  db.query("INSERT INTO review (dorm_id,writer_id,star,comment) VALUES(?,?,?,?)",
    [dorm_id, writer_id, star, comment],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
})

// Chat (get chat data)
app.get("/chat/:chanel", (req, res) => {
  db.query(
    `SELECT chat.*,sender.user_name as sender,receiver.user_name as receiver FROM chat
    join user_data as sender on chat.sender_id = sender.id
    join user_data as receiver on chat.receiver_id = receiver.id
    WHERE chanel_id = ?
    ORDER BY time ASC;
  `,
    [req.params.chanel],
    (err, result) => {
      if (typeof result == "undefined") {
        res.status(404).send();
      } else {
        res.send(result);
      }
    }
  );
});



// Chat (get person)
app.get("/person/:user", (req, res) => {
  db.query(
    `SELECT chanel.*,user1.user_name as user1,user2.user_name as user2,user1.profile as profile1 ,user2.profile as profile2 FROM chanel
    JOIN user_data AS user1 ON chanel.member1 = user1.id
    JOIN user_data AS user2 ON chanel.member2 = user2.id
    WHERE chanel.member1 = ? OR chanel.member2 = ?;`,
    [[req.params.user], [req.params.user]],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// Chat (post send message)
app.post("/send_message", (req, res) => {
  console.log(req.body)
  chanel = req.body.chanel
  sender = req.body.sender_id
  receiver = req.body.receiver_id
  message = req.body.message
  db.query(
    "INSERT INTO chat (chanel_id, sender_id, receiver_id, message_text) VALUES(?,?,?,?)",
    [chanel, sender, receiver, message],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("add message success");
        res.send(result);
      }
    }
  );
})


//Register (post)
app.post("/creat_user", (req, res) => {
  const user_name = req.body.user_name;
  const email = req.body.email;
  const password = req.body.password;
  const profile = req.body.profile;
  const actor = "user";
  console.log(req.body);
  bcrypt.hash(password, saltRounds, function (err, hash) {
    db.query(
      "INSERT INTO user_data (user_name, email, password,profile,actor) VALUES(?,?,?,?,?)",
      [user_name, email, hash, profile, actor],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("add user success");
          res.send(result);
        }
      }
    );
  });
});



//login
app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.query);
  db.query("SELECT * FROM user_data WHERE email=?;", [email], (err, user) => {
    if (user[0] !== undefined) {
      bcrypt.compare(password, user[0].password, function (err, result) {
        if (result) {
          var token = jwt.sign(
            {
              id: user[0].id,
              username: user[0].user_name,
              profile: user[0].profile,
              actor: user[0].actor,
            },
            jwtKey,
            {
              expiresIn: "1h",
            }
          );
          res.json({ token, user });
        } else {
          res.status(400).json({ status: "err2" });
          console.log(err);
        }
      });
    } else {
      res.status(400).json({ status: "err" });
      console.log(err);
    }
  });
});

//auten
app.post("/auten", (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtKey);
    res.json({ decoded, status: "ok" });
  } catch (err) {
    res.status(400).json({ status: "err", token });
    console.log(err);
  }
});

//Manage (post) 
app.put("/update", (req, res) => {
  _ = req.body.dorm.dorm_id;
  dorm_name = req.body.dorm.dorm_name;
  min = req.body.dorm.min_price;
  max = req.body.dorm.max_price;
  distance = req.body.dorm.distance;
  url = req.body.dorm.url;
  wifi = req.body.dorm.wifi;
  address = req.body.dorm.address;
  moreinfo = req.body.dorm.more_info;
  size = req.body.dorm.size;
  heater = req.body.dorm.water_heater;
  tv = req.body.dorm.TV;
  air = req.body.dorm.air;
  fridge = req.body.dorm.fridge;
  bike = req.body.dorm.bike;
  car = req.body.dorm.car;
  fitness = req.body.dorm.fitness;
  washer = req.body.dorm.washer;
  pool = req.body.dorm.pool;
  key = req.body.dorm.dorm_key;
  key_card = req.body.dorm.key_card;
  camera = req.body.dorm.camera;
  guard = req.body.dorm.guard;
  finger_print = req.body.dorm.finger_print;
  db.query(
    `
  UPDATE dorm_detail
  SET dorm_name = ?,min_price = ?,max_price = ?,distance = ?,url = ?,wifi = ?,address = ?,more_info = ?,size = ?
  WHERE dorm_id = ?;

  UPDATE facility
  SET water_heater =?, TV =?, air =?, fridge =?, bike =?, car =?, fitness =?, washer =?, pool =?
  WHERE dorm_id = ?;

  UPDATE safety
  SET dorm_key = ?,key_card = ?,camera = ?,guard = ?,finger_print = ?
  WHERE dorm_id = ?;
  `,
    [
      dorm_name, min, max, distance, url, wifi, address, moreinfo, size, id,
      heater, tv, air, fridge, bike, car, fitness, washer, pool, id,
      key, key_card, camera, guard, finger_print, id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("add user success");
        res.send(result);
      }
    }
  );
});

//Delete dorm(delete)
app.delete("/delete/:id", (req, res) => {
  console.log(typeof req.params.id)
  const id = req.params.id;
  db.query(`
  DELETE FROM dorm_detail
  WHERE dorm_id = ?;

  DELETE FROM facility
  WHERE dorm_id = ?;

  DELETE FROM safety
  WHERE dorm_id = ?;
  `, [id, id, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("delet dorm success");
        res.send(result);
      }
    });
})




//Help  ticket(get)
app.get("/ticket", (req, res) => {
  const user_id = req.query.user_id
  console.log("user_id", typeof user_id)
  var filter = "WHERE user_id = " + user_id + ";"
  if (user_id === "0") {
    filter = ";"
  }
  console.log("filter", filter)
  db.query("SELECT * FROM ticket " + filter, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});
//Help message(get)
app.get("/ticketMessage", (req, res) => {
  console.log(req.query)
  db.query(
    `SELECT ticket_message.*,sender.user_name as sender,receiver.user_name as receiver FROM ticket_message
    join user_data as sender on ticket_message.sender_id = sender.id
    join user_data as receiver on ticket_message.receiver_id = receiver.id
      WHERE ticket_id = ?
      ORDER BY time ASC;
  `,
    [req.query.ticket_id, req.query.user_id, req.query.user_id],
    (err, result) => {
      if (typeof result == "undefined") {
        res.send("");
      } else {
        console.log(result)
        res.send(result);
      }
    }
  );
});

//Help (update status)
app.put("/update_ticket_status", (req, res) => {
  console.log(req.body)
  new_status = req.body.new_status
  ticket_id = req.body.ticket_id
  db.query(`UPDATE ticket
  SET status = ?
  WHERE ticket_id = ?;`, [new_status, ticket_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    })
});

app.post("/example", (req, res) => {
  console.log(req.body)
})

app.get("/get_chanel", (req, res) => {
  const person1 = req.query.user1
  const person2 = req.query.user2
  console.log("get chanel")
  db.query(`SELECT * FROM hornai_d.chanel 
  where (member1 = ? or member2 = ?)
  and (member1 = ? or member2 = ?);
  `, [person1, person1, person2, person2],
    (err, result) => {
      if (result[0] === undefined) {
        console.log("dont have")
        db.query("INSERT INTO chanel (member1,member2) VALUE(?,?)", [person1, person2])
        db.query(`SELECT * FROM hornai_d.chanel 
      where (member1 = ? or member2 = ?)
      and (member1 = ? or member2 = ?);
      `, [person1, person1, person2, person2],
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.send(result[0]);
            }
          })
      } else {
        console.log("have")
        res.send(result[0]);
      }
    })
})

app.get("/profile", (req, res) => {
  db.query("SELECT * FROM hornai_d.user_data WHERE id = ?;",
    [req.query.user_id], (err, result) => {
      if (err) {
        res.send("unknow");
      } else {
        res.send(result)
      }
    })
})

//creat ticket
app.post("/creat_ticket", (req, res) => {
  const subject = req.body.subject
  const message = req.body.message
  const user_id = req.body.user_id
  db.query("INSERT INTO ticket (user_id,subject,status) VALUE(?,?,?);",
    [user_id, subject, "on hold"], (err, result) => {
      db.query("INSERT INTO ticket_message (ticket_id, sender_id, receiver_id, message_text) value(?,?,?,?);",
        [result.insertId, user_id, 0, message])
    });
})

app.get("/dorm_id", (req, res) => {
  db.query(`SELECT dorm_id FROM user_data
  JOIN dorm_detail ON user_data.user_name = dorm_detail.dorm_name
  WHERE user_name = ?;`
    , [req.query.username], (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.send(result)
      }
    })
})