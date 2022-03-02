const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    merchantid: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Merchantuser"
     },

    productname: {
        type: String,
        required: true
    },
    productprice: {
        type: Number,
        required: true,
       
    },
    productdescription: {
        type: String,
        required: true
    },
    productimage: {
        type: String,
        required: true 
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const merchantProduct = mongoose.model('Merchantproduct', ProductSchema);
module.exports = merchantProduct;


