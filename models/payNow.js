const mongoose = require("mongoose");
const { Schema } = mongoose;

const PayNowSchema = new Schema({


   
    cus_name: {
        type: String,
        required: false

    },
    cus_email: {
        type: String,
        required: false

    },
    product_name: {
        type: String,
        required: false

    },
    product_profile: {
        type: String,
        required: false

    },
    product_image: {
        type: String,
        required: false

    },
    total_amount: {
        type: String,
        required: false

    },
    date: {
        type: Date,
        default: Date.now
    }
});

const payNow = mongoose.model('PayNow', PayNowSchema);
module.exports = payNow;


