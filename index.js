const express = require("express")
const app = express();
require('dotenv').config()
const authmerchantUser = require("./routes/auth")
const port=8080||process.env.PORT
const connecttoMongo = require("./db")
connecttoMongo();
app.use(express.json())

//Available routes
app.use("/api/auth", authmerchantUser)


app.get("/", (req, res) => {
    res.json("tushar")
});


app.listen(port, () => {
    console.log(`localhost running in ${port}`)
})
