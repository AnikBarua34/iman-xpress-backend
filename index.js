const express = require("express")
const app = express();
require('dotenv').config()
var cors = require('cors')
const port = 8080 || process.env.PORT

const authmerchantUser = require("./routes/auth")
const authRiderUser = require("./routes/authRider")
const riderProfile = require("./routes/riderProfile")
const merchantProduct = require("./routes/merchantproduct")

const connecttoMongo = require("./db")
connecttoMongo();
app.use(express.json())
app.use(cors())


//Available routes
app.use("/api/auth", authmerchantUser)
app.use("/api/authRider", authRiderUser)
app.use("/api/riderProfile", riderProfile)
app.use("/api/merchant", merchantProduct )


app.get("/", (req, res) => {
    res.json("IMANXpress Server")
});


app.listen(port, () => {
    console.log(`localhost running in ${port}`)
})
