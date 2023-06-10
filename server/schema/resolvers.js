const { AuthenticationError } = require('apollo-server-express');
const { User, Product, Category } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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

        getProductByID: async (_, { productId }) => {
            return await Product.findById(productId).populate('user').populate('category');
        },
        getUserByID: async (_, { userId }) => {
            return await User.findById(userId);
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.products',
                    populate: 'category'
                });
                return user.orders.id(_id);
            }
            throw new AuthenticationError('Not logged in');
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin
            const order = newOrder({ products: args.products });
            const { products } = await order.populate('products').execPopulate();

            const line_items = [];

            for (let i = 0; i < products.length; i++) {
                const product = await stripe.products.create({
                    name: products[i].name,
                    description: products[i].description,
                    images: []
                });
                const price = await stripe.prices.create({
                    product: product.id,
                    unit_amount: products[i].price * 100,
                    currency: 'usd',
                });
                line_items.push({
                    price: price.id,
                    quantity: 1,
                });
            }
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}`,
            });
            return { session: session.id };
        }


    },
    Mutation: {
        addUser: async (_, args) => {
            const user = new User(args);
            await user.save();
            const token = signToken(user);

            return { token, user };
        },

        addProduct: async (_, { name, description, image, price, categoryId, userId, start_date, end_date }) => {

            const newProduct = new Product({
                name,
                description,
                image,
                price,
                category: categoryId,
                user: userId,
                start_date,
                end_date,
            });

            return await newProduct.save();
        },

        addCategory: async (_, args) => {
            const category = new Category(args);
            await category.save();


            return { category };
        },
        updateUser: async (parent, args, context) => {

            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, {
                    new: true,
                });
            }
            throw new AuthenticationError('Not logged in');
        },
        updateUserAvatar: async (_, { image, userId }, context) => {
            const user = await User.findById(userId);

            if (!user) {
                throw new Error('User not found');
            }

            user.image = image;
            await user.save();

            return user;
        },

        updateProduct: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;
            return await Product.findByIdAndUpdate(
                _id,
                { $inc: { quantity: decrement } },
                { new: true }
            );
        },

        updateProductById: async (_, { productId, name, description, image, price, categoryId, start_date, end_date }) => {
            try {
                const product = await Product.findByIdAndUpdate(
                    productId,
                    {
                        name,
                        description,
                        image,
                        price,
                        category: categoryId,
                        start_date,
                        end_date,
                    },
                    { new: true }
                ).populate('user').populate('category');

                return product;
            } catch (error) {
                console.error('Error updating product:', error);
                throw new Error('Failed to update product');
            }
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

        deleteProduct: async (_, { productId }) => {
            const product = await Product.findById(productId);

            if (!product) {
                throw new Error('Product not found');
            }

            await Product.findByIdAndDelete(productId);
            return product;
        },
    }
}

module.exports = resolvers;