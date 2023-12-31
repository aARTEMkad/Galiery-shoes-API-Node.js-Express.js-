const mongoose = require('mongoose')

const ShoesShema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    
    product: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    size: [Number],

    vendorcode: {
        type: String,
    },

    color: {
        type: [String]
    },

    isSoon: {
        type: Boolean,
    },

    front_photo: {
        filename: String,
        originalname: String,
        path: String,
        data: String,
    },

    back_photo: {
        filename: String,
        originalname: String,
        path: String,
        data: String,
    },

    top_photo: {
        filename: String,
        originalname: String,
        path: String,
        data: String,
    },

    aspect_photo: {
        filename: String,
        originalname: String,
        path: String,
        data: String,
    },
})

module.exports = mongoose.model('Shoes', ShoesShema)