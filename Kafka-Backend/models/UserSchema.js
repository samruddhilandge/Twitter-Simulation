var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
UserSchema = new Schema({
  
  username: {
    type: String,
    default: ''
  },

  firstName: {
    type: String,
    default: ''
  },

  lastName: {
    type: String,
    default: ''
  },

  email: {
    type: String,
    default: ''
  },

  city: {
    type: String,
    default: ''
  },

  state: {
    type: String,
    default: ''
  },

  zipcode: {
    type: String,
    default: ''
  },

  profilePicture: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  },

  active:{
      type: Boolean,
      default: true
  },
  viewCount:{
    type:Number,
    default: 0
  },

  followers:[],
  following:[],

  listMember : [],
  listSubscriber : []
});
    
module.exports = mongoose.model('Users', UserSchema);