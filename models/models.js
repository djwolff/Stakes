var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(connect);

// Step 1: Write your schemas here!
// Remember: schemas are like your blueprint, and models
// are like your building!
var userSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String,
  facebookId: String,
  pictureURL: String
});

var contactSchema = mongoose.Schema({
  name: String,
  phone: String,
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
})

var messageSchema = mongoose.Schema({
  created: Date,
  content: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  contact: {
    type: mongoose.Schema.ObjectId,
    ref: 'Contact'
  },
  channel: String,
  status: String,
  from: String
})

userSchema.statics.findOrCreate = function(specification, extras, callback) {
 User.findOne(specification, function(error, foundUsers) {
   if (error) {
     callback(error);
   } else if (!foundUsers) {
     var object = Object.assign(specification, extras);
     var user = new User(object);
     console.log('Created User:')
     console.log(user);
     user.save(callback(error, user))
   } else {
     console.log('Found User:');
     console.log(foundUsers);
     callback(null, foundUsers)
   }
 })
}


// Step 2: Create all of your models here, as properties.
var User = mongoose.model('User', userSchema);
var Contact = mongoose.model('Contact', contactSchema)
var Message = mongoose.model('Message', messageSchema)
// Step 3: Export your models object
module.exports = {
  User: User,
  Contact: Contact,
  Message: Message
};
