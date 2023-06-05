const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        getCategory: async () => {
            console.log("Here calling now");
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
        },

        addCategory: async (_, args) => {
            const category = new Category(args);
            await category.save();


            return { category };
        },

    }
}

module.exports = resolvers;