const express = require('express');
const path= require('path');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const httpProxy = require('http-proxy');
const request = require('request');

mongoose.connect('mongodb://localhost/music1');
global.db = mongoose.connection;

// Check connection
db.once('open', function(){
  console.log('Connected to MongoDB');
});

// Check for DB errors
db.on('error', function(err){
  console.log(err);
});

//Init app
const app=express();

const bcrypt = require('bcryptjs');

// Body parser middleware. Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

var apiProxy = httpProxy.createProxyServer();

app.use(express.static(path.join(__dirname, 'dist')));

//app.use('/', routes);

/*app.request("/api/token", function(req, res) {
  console.log('Redirect Aairuchu');
  apiProxy.web(req, res, {target: 'https://accounts.spotify.com/token'});
  res.send(res);
});*/

const client_id = 'efa13ac850d54440bf11925779abfe9a';
const client_secret = 'f947ab4997c947738a896e7d34f244fb';
var redirect_uri = 'http://localhost:4200';


app.post('/getTracks', function(req, res) {
  let mm = 'http://api.spotify.com/v1/search?query=' + JSON.stringify(req.body[0].one).replace(/\"/g, "") + '&offset=0&limit=50&type=' + JSON.stringify(req.body[0].one1).replace(/\"/g, "") + '&market=US';

  if(false) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    //res.clearCookie(stateKey);
    var authOptions = {
      url :'http://api.spotify.com/v1/search?query='+JSON.stringify(req.body[0].one).replace(/\"/g, "")+'&offset=0&limit=50&type='+JSON.stringify(req.body[0].one1).replace(/\"/g, "")+'&market=US',
      /*url: 'https://api.spotify.com/search?query='+JSON.stringify(req.body[0].one).replace(/\"/g, "") + '&offset=0&limit=50&type=' + JSON.stringify(req.body[0].one1).replace(/\"/g, "") + '&market=US',*/
      /*form: {
        redirect_uri: redirect_uri,
        grant_type: 'client_credentials'
      },*/

      /*http://localhost:4200/v1/search?query=a&offset=0&limit=50&type=track&market=US*/
      headers:{
        'Authorization': 'Bearer ' + JSON.stringify(req.body[0].one2).replace(/\"/g, "")
      },
      json: true
    };
    request.get(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        //response.send(200);
        res.send(body);
      }
    });
  }
});



app.post('/testingInProgress', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (false) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    //res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'client_credentials'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
          refresh_token = body.refresh_token;
        console.log(body.access_token);
        //response.send(200);
        res.send(body);
      }
    });
  }
});





app.get('/', (req, res) => {

  res.sendFile(path.join(__dirname, 'dist/index.html'));

});




// Route Files

// let users = require('./routes/users');
// app.use('/users', users);

let users = require('./routes/users');
app.use('/users', users);


//Start server
app.listen(4200, function(){
  console.log('Server started on port 4200...');
});