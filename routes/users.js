const express = require('express');
const router = express.Router();
const path= require('path');

// mongoose.connect('mongodb://localhost/music1');
// let db = mongoose.connection;

//var db = require('app.js');

const bcrypt = require('bcryptjs');

// User Model
let User = require('../model/user');
router.use(express.static(path.join(__dirname, '../src/app/components/register-user')));

//app.use('/', routes);

// router.get('/register', (req, res) => {

//   res.sendFile(path.join(__dirname, '../src/app/components/register-user/register-user.component.html'));

// });

/*router.post('/register2', function(req, res){

  var params = ('grant_type=client_credentials');

  var headers = new Headers();
  headers.append('Authorization', 'Basic ' + this.encoded);

  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  return this._http.post('/api/token', params, { headers: headers })
    .map(res => res.json());
}*/



// Register Proccess
router.post('/register', function(req, res){


  const fname = req.body.fname;
  const lname = req.body.lname;
  const phone = req.body.phone;
  const address = req.body.address;
  const email = req.body.email;
  const password = req.body.password;

  req.checkBody('fname', 'First Name is required').notEmpty();
  req.checkBody('lname', 'Last Name is required').notEmpty();
  req.checkBody('phone', 'Phone Name is required').notEmpty();
  req.checkBody('address', 'Address Name is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();

  //let errors = req.validationErrors();
  if(false){
    res.sendFile('../src/app/components/register-user/register-user.component.html', {
      errors:errors
    });
  }else{
    let newUser = new User({
      fname:fname,
      lname:lname,
      phone:phone,
      address:address,
      email:email,
      password:password

    });



    bcrypt.genSalt(10, function(err,salt){
      bcrypt.hash(newUser.password,salt,function(err,hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          }else{
            req.flash('success','You are now registered and can go to playlist');
            res.redirect('/users/playlist');
          }
        });
      });
    });
  }

});

//Find user details from db
router.post('/getUser', function(req, res){

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/music1";



  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    //var dbo = db.db("music1");
    console.log(JSON.stringify(req.body[0].mail).replace(/\"/g, ""));

    var query = { email: JSON.stringify(req.body[0].mail).replace(/\"/g, "").toString() };
    db.db("music1").collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;

      console.log(result);
      res.send(result);
      //res.sendStatus(200);
      db.close();
    });
  });

});

//Save track id and email from request object
router.post('/trackSaveId', function(req, res){

  console.log("Inside saveId Track Id String is :"+JSON.stringify(req.body[0].trackId).replace(/\"/g, ""));
  console.log("Inside SaveId Tracks Email String is :"+JSON.stringify(req.body[0].emailId).replace(/\"/g, ""));

  const trackId = JSON.stringify(req.body[0].trackId).replace(/\"/g, "");
  const trackEmail = JSON.stringify(req.body[0].emailId).replace(/\"/g, "");

  let trackInfo = new TrackInfo({
    trackId:trackId,
    trackEmail:trackEmail
  });

  trackInfo.save(function(err){
    if(err){
      console.log(err);
      return;
    }else{
      req.flash('success','Track saved');

    }
  });

});

//Find tracks based on email id
router.post('/findTracks', function(req, res){

  console.log("Inside SaveId Tracks Email String is :"+JSON.stringify(req.body[0].emailId).replace(/\"/g, ""));

  var MongoClient = require('mongodb').MongoClient;
  var url = "mongodb://localhost:27017/music1";

  console.log('Inside FindTracks');

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    //var dbo = db.db("music1");
    console.log("Inside SaveId Tracks Email String isssssssssssss :"+JSON.stringify(req.body[0].emailId).replace(/\"/g, ""));

    var query = { trackEmail: JSON.stringify(req.body[0].emailId).replace(/\"/g, "").toString() };
    db.db("music1").collection("tracks").find(query).toArray(function(err, result) {
      if (err) throw err;

      console.log(result.trackId);
      res.send(result);
      //res.sendStatus(200);
      db.close();
    });
  });

});

// Login Form
router.get('/home', function(req, res){
  res.sendFile('../src/app/components/playlist/playlist.component.html');
});

module.exports = router;
