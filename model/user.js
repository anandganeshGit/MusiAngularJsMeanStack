
const mongoose = require('mongoose');

// User Schema
const UserSchema = mongoose.Schema({
    fname:{
      type: String,
      required: true
    },
    lname:{
        type: String,
        required: true
      },
    phone:{
        type: String,
        required: true
      },
    address:{
        type: String,
        required: true
      },
    email:{
      type: String,
      required: true
    },
    password:{
      type: String,
      required: true
    }
  },{ collection: 'users' });
  
  const User = module.exports = mongoose.model('User', UserSchema);