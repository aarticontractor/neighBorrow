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
        },
        getProducts: async () => {
            return await Product.find().populate('user').populate('category');
        },

        getProductbyID: async (_, { productId }) => {
            return await Product.findById(productId).populate('user').populate('category');
        },
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

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
    }
}

module.exports = resolvers;