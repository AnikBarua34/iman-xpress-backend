const mongoose = require("mongoose");

//
const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6xsao.mongodb.net/?retryWrites=true&w=majority`;

const connectMongo = () => {
  mongoose
    .connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
};

module.exports = connectMongo;
