const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  employeeSchema = new Schema({
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  });

module.exports = mongoose.model('Employee', employeeSchema);
