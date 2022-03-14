const mongoose = require("mongoose");
const { Schema } = mongoose;

const PartnerSchema = new Schema({


   
    image: {
        type: String,
        required: true

    },

    date: {
        type: Date,
        default: Date.now
    }
});

const partner = mongoose.model('Partner', PartnerSchema);
module.exports = partner;


