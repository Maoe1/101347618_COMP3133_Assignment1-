const User = require('./models/User');

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
  }
};

module.exports = { resolvers };