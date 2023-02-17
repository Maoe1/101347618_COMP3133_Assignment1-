const User = require('./models/User');
const Employee = require('./models/Employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
        try {
          const user = new User({ username, email, password });
          await user.save();
          return  {
            success: true,
            message: 'User added successfully!',
            user: user
        };
       } catch (err){
        return {
           success: false,
           message: err.message,
           user: null
        }
      }
    },
     addEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
          try {
            const employee = new Employee({ first_name, last_name, email, gender, salary});
            await employee.save();
            return {
              success: true,
              message: 'Employee added successfully!',
              employee: employee
            };
          } catch (err) {
            return {
              success: false,
              message: err.message,
              employee: null
            };
          }
        }
  },
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      if (password !== user.password) {
        throw new Error('Incorrect password');
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return token;
    },
  },

};

module.exports = { resolvers };