const mongoose = require('mongoose');
const { Schema } = mongoose;

const employeeSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^[a-zA-Z]+$/.test(v);
          },
          message: 'first name must contain only letters'
        }
      },
    last_name: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^[a-zA-Z]+$/.test(v);
          },
          message: 'last name must contain only letters'
        }
      },
    email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[\w._%+-]+@[\w.-]+\.[A-Za-z]{2,}$/,
      'Please enter a valid email address'
    ]
  },
gender: {
    type: String,
    enum: ['male','female', 'other'],
    lowercase: true
},
salary:
{
    type: Number,
    require: true

}
  
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;