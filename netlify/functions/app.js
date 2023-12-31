// app.js
const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const serverless = require('serverless-http');
const exp = express();
const bodyParser = require('body-parser');

// const app = express();
const app = express.Router();
const PORT = 4000;

//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html',{root:__dirname})
});

app.post('/user', (req, res) => {
    if (req.body.username == myusername && req.body.password == mypassword) {
      session = req.session;
      session.userid = req.body.username;
      console.log(req.session);
      res.status(200).json({ success: true, status: 'Login successful' });
    } else {
      res.status(401).json({ success: false, error: 'Invalid username or password' });
    }
});
  
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
exp.use(bodyParser.json());
exp.use('/.netlify/functions/app', app);
module.exports = exp;
module.exports.handler = serverless(exp);