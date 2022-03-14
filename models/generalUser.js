const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
   
  email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required:true
    },
    
    date: {
        type: Date,
        default: Date.now
    }
});

const generaluser = mongoose.model('Generaluser', UserSchema);
module.exports = generaluser;


