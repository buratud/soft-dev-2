require('dotenv').config();

const express = require('express');

const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors')

const authRegister = require('./routes/auth-register');
const authLogout = require('./routes/auth-logout');
const authLogin = require('./routes/auth-login');
const authCheck = require('./routes/auth-check');

const userData = require('./routes/user-info');
// const picUpload = require('./routes/pic-upload');
const profData = require('./routes/prof-data');
const profEdit = require('./routes/prof-edit');
const profDelete = require('./routes/prof-delete');

const itemList = require('./routes/item-list');
const itemCount = require('./routes/item-count');
const expireCount = require('./routes/item-expire');
const itemRoutes = require('./routes/item-routes');
const itemAdd = require('./routes/item-add');
const itemEdit = require('./routes/item-edit');
const itemDelete = require('./routes/item-delete');

const itemListName = require('./routes/item-list-name');        //(Sort by name A-Z)
const itemListExpD = require('./routes/item-list-expiry');      //(Sort by nearest Expiry Date)
const itemListRecAdd = require('./routes/item-list-rec-add');   //(Sort by recently add)
const itemListQtyAsc = require('./routes/item-list-qty-asc');   //(Sort by quantity 1-10)
const itemListQtyDes = require('./routes/item-list-qty-des');   //(Sort by quantity 10-1)

const feedbackData = require('./routes/feedback-add');

const app = express();
const port = 1500;

var allowlist = ['http://example1.com', 'http://example2.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use('*', cors({
    origin: 'https://myfridgevm.southeastasia.cloudapp.azure.com',
    methods: ['POST', 'PUT', 'GET', 'UPDATE', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true,
}));
app.use('/imageData',express.static('uploads'))
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({extended:true})); //Parse URL-encoded bodies
// app.use(bodyParser. text({type: '/'}));
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'uiktuttjthjttyjtyjtytyjjsdzdxbxbxv5353',
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 3600000,
        sameSite: 'Strict',
    },
    name: 'project151-cookie'
}));

app.get('/', (req, res) => {
    res.redirect('/home.html');
});

// Auth Routing
app.use('/auth/register', authRegister);
app.use('/auth/logout', authLogout);
app.use('/auth/login', authLogin);
app.use('/auth/check', authCheck);

// Profile info
app.use('/user/info', userData);
app.use('/prof/edit', profEdit);
app.use('/prof/data', profData);
app.use('/prof/delete', profDelete);
// app.use('/pic/upload', picUpload);

// Item Routing
app.use('/item/list', itemList);
app.use('/item/count', itemCount);
app.use('/item/expire', expireCount);
app.use('/item/routes', itemRoutes);

// Item Showing (Optional)
app.use('/item/list/name', itemListName);
app.use('/item/list/expd', itemListExpD);
app.use('/item/list/recadd', itemListRecAdd);
app.use('/item/list/qtyasc', itemListQtyAsc);
app.use('/item/list/qtydes', itemListQtyDes);

// Shopping Cart Routing
app.use('/item/add', itemAdd);
app.use('/item/edit', itemEdit);
app.use('/item/delete', itemDelete);

// Feedback send routing
app.use('/feedback/add', feedbackData);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        ok: false,
        error: 'Server Error!'
    });
});
app.listen(port, () => {
    console.log(`Project MyFridge API is listening on port ${port}`)
});
