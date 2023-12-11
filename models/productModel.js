const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({   
    name: {
        type: String,
        required: [true, "A product must have a name"],
        trim: true,
        maxlength:[40, "A tour name must have less or equal than 40 characters"],
        minlength:[10, "A tour name must have more or equal than 10 characters"],
    },
    price: {
        type: Number,
        required: [true, "A product must have stock quantity"],
    },
    stock: {
        type: String,
        required: [true, "A product must have stock quantity"],
    },
    specialPrices: {
        type: Array,
        default: [],
    },

    
},{
    toJSON:{ virtuals: true },
    toObject :{ virtuals: true }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product;
