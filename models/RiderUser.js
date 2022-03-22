const { default: mongoose } = require("mongoose");

const RiderSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    riderState: {
        type: String, 
        required: true
    },
    image: {
        type: String,
       
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    login_status: {
        type: Number,
        default:0 
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Rider = new mongoose.model("Rider", RiderSchema)

module.exports = Rider;