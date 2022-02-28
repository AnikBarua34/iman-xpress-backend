const express = require("express")
const app = express();
require('dotenv').config()
var cors = require('cors')
const authmerchantUser = require("./routes/auth")
const merchantProduct = require("./routes/merchantproduct")
const port=8080||process.env.PORT
const connecttoMongo = require("./db")
connecttoMongo();
app.use(express.json())
app.use(cors())



//Available routes
app.use("/api/auth", authmerchantUser)
app.use("/api/merchant", merchantProduct )


app.get("/", (req, res) => {
    res.json("tushar")
});


app.listen(port, () => {
    console.log(`localhost running in ${port}`)
})
