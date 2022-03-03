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
    city: {
        type: String,
        required: true
    },
    bikeRider: {
        type: String,       
    },
    foodDelivery: {
        type: String,        
    },
    parcelDelivery: {
        type: String,       
    },
    medicineDelivery: {
        type: String,        
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required: true
    }
})

const Rider = new mongoose.model("Rider", RiderSchema)

module.exports = Rider;