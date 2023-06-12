const mongoose = require('mongoose');
const Category = require('../models/category.js');
const User = require('../models/User.js');
const Product = require('../models/product.js');
const db = require('../config/connection');

// import the JSON data
const categoriesData = require('./categories.json');
const userData = require('./users.json');
const productsData = require('./products.json');

const seedDatabase = async () => {
    try {
        // ensure connection to the database
        await db;

        // insert categories if they do not already exist
        const insertedCategories = await Promise.all(
            categoriesData.map(async (category) => {
                const existingCategory = await Category.findOne({
                    _id: category._id.$oid,
                });

                if (!existingCategory) {
                    const newCategory = new Category({
                        _id: mongoose.Types.ObjectId(category._id.$oid),
                        name: category.name,
                        parent: category.parent,
                    });

                    return newCategory.save();
                }

                return null; // category already exists, skip insertion
            })
        );

        // filter out null values (existing categories)
        const newCategories = insertedCategories.filter(
            (category) => category !== null
        );

        console.log(`${newCategories.length} new categories inserted!`);

        // insert users if they do not already exist
        const insertedUsers = await Promise.all(
            userData.map(async (user) => {
                const existingUser = await User.findOne({
                    _id: user._id.$oid,
                });

                if (!existingUser) {
                    const newUser = new User({
                        _id: mongoose.Types.ObjectId(user._id.$oid),
                        name: user.name,
                        email: user.email,
                        password: user.password,
                    });

                    return newUser.save();
                }

                return null; // user already exists, skip insertion
            })
        );

        // filter out null values (existing users)
        const newUsers = insertedUsers.filter((user) => user !== null);

        console.log(`${newUsers.length} new users inserted!`);

        // insert products if they do not already exist
        const insertedProducts = await Promise.all(
            productsData.map(async (product) => {
                const existingProduct = await Product.findOne({
                    _id: product._id.$oid,
                });

                if (!existingProduct) {
                    const newProduct = new Product({
                        _id: mongoose.Types.ObjectId(product._id.$oid),
                        user: mongoose.Types.ObjectId(product.user.$oid),
                        name: product.name,
                        price: product.price,
                        category: mongoose.Types.ObjectId(product.category.$oid),
                        __v: product.__v,
                        image: product.image,
                        end_date: product.end_date,
                        start_date: product.start_date,
                    });

                    return newProduct.save();
                }

                return null; // product already exists, skip insertion
            })
        );

        // filter out null values (existing products)
        const newProducts = insertedProducts.filter((product) => product !== null);

        console.log(`${newProducts.length} new products inserted!`);

        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedDatabase();
