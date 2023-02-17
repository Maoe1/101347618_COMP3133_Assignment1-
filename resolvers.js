const User = require('./models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      return user;
    }
  },
  Query: {
    // Other queries...
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