const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({


    city: {
        type: String,
        required: true,
   
    },
    email: {
        type: String,
        required: true
        
    },
    fname: {
        type: String,
        required: true

    },
    note: {
        type: String,
        required: true
    },
    ordersdata: {
        type: [],
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    pstreetAddresshone: {
        type: String,
        required: true
    },
    totalamountwithtaxandshipping: {
        type: Number,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const order = mongoose.model('Order', OrderSchema);
module.exports = order;


// city: "s1"
// email: "anik@anil.com"
// fname: "as"
// lname: "as"
// note: "aaaaaaa"
// ordersdata: Array(2)
// 0: {_id: '6223659624755cda6de7b2bf', merchantid: '6220e8b81a9fd042dc67a005', productname: 'kacci biriany', productprice: 2010, productdescription: 'this is best biriany forever', …}
// 1: {_id: '6223654b24755cda6de7b2bd', merchantid: '6220e8b81a9fd042dc67a005', productname: 'roast 2', productprice: 240, productdescription: 'this rejala is very delicious', …}
// length: 2
// [[Prototype]]: Array(0)
// phone: "1"
// postalCode: "1"
// streetAddress: "asa"
// totalamountwithtaxandshipping: 7963