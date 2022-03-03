const mongoose = require("mongoose");
// const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lp6z6.mongodb.net/imanXpress?retryWrites=true&w=majority`;

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lp6z6.mongodb.net/imanxpress?retryWrites=true&w=majority`;


const connectMongo = () => {
    mongoose.connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
       
    }).then(() => console.log("Database connected!"))
        .catch(err => console.log(err));;
}

module.exports=connectMongo