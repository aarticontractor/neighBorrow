const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        }
    },
    Mutation: {
        addUser: async (_, args) => {
            const user = new User(args);
            await user.save();
            const token = signToken(user);

            return { token, user };
        }
    }
}

module.exports = resolvers;