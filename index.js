const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema');
const { resolvers } = require('./resolvers');
const mongoose = require('mongoose');

const app = express();

process.env.JWT_SECRET = 'mysecretkey';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const db = mongoose.connection.db;
    return { db };
  },
});

server.applyMiddleware({ app });
MONGODB_URL='mongodb+srv://maoe1:google123@cluster0.mtvhcjr.mongodb.net/comp3133_assignment1?retryWrites=true&w=majority'
console.log(server.graphqlPath)

mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen({ port: 4000 }, () =>
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
      
    );
  })
  .catch(err => console.error(err));