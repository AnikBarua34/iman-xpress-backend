const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
   
  
    name: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
    storeAddress: {
        type: String,
        required: true
    },
    faceBookLink: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    
    date: {
        type: Date,
        default: Date.now
    }
});

const merchantUser = mongoose.model('Merchantuser', UserSchema);
module.exports = merchantUser;


