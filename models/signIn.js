const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/photoOps");
const UserSessionSchema = new UserSessionSchema({
  userId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('UserSession', UserSessionSchema);