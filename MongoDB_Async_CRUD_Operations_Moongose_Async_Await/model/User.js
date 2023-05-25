const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  userSchema = new Schema({
    username: {
      type: String,
      required: true,
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Editor: Number,
      Admin: Number,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
  });

module.exports = mongoose.model('User', userSchema);
