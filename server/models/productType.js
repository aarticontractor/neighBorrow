const mongoose = require('mongoose');

const { Schema } = mongoose;

const productTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
});

const productType = mongoose.model('productType', productTypeSchema);

module.exports = productType;