const { AuthenticationError } = require('apollo-server-express');
const { User, Product } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        categories: async () => {
            return await Category.find();
        },
        getUsers: async () => {
            return await User.find();
        }
    },
    Mutation: {
        addUser: async (_, args) => {
            const user = new User(args);
            await user.save();
            const token = signToken(user);

            return { token, user };
        },

        addProduct: async (_, { name, description, image, price, categoryId, userId }) => {
            const newProduct = new Product({
                name,
                description,
                image,
                price,
                category: categoryId,
                user: userId
            });

            return await newProduct.save();
        }

    }
}

module.exports = resolvers;