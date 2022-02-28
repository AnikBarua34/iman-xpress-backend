const express = require("express")
const app = express();
require('dotenv').config()
var cors = require('cors')

const authmerchantUser = require("./routes/auth")
const authRiderUser = require("./routes/authRider")

const port= 8080||process.env.PORT
const connecttoMongo = require("./db")
connecttoMongo();
app.use(express.json())
app.use(cors())



//Available routes
app.use("/api/auth", authmerchantUser)
app.use("/api/authRider", authRiderUser)


app.get("/", (req, res) => {
    res.json("IMANXpress Server")
});


app.listen(port, () => {
    console.log(`localhost running in ${port}`)
})
