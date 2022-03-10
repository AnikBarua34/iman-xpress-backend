const mongoose = require("mongoose");
const { Schema } = mongoose;

const BlogSchema = new Schema({


    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
        
    },
    image: {
        type: String,
        required: true

    },
    category: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

const blog = mongoose.model('Blog', BlogSchema);
module.exports = blog;


