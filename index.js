const express = require("express")
const app = express();
require('dotenv').config()
var cors = require('cors')
const port = process.env.PORT || 8080

const authmerchantUser = require("./routes/auth")
const authRiderUser = require("./routes/authRider")
const merchantProduct = require("./routes/merchantproduct")
const blogsection = require("./routes/blogSection")
const partnerSection = require("./routes/partnerSection")
const payNowSection = require("./routes/payNowSection")


const connecttoMongo = require("./db")
connecttoMongo();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended:true}));


//Available routes
app.use("/api/auth", authmerchantUser)
app.use("/api/merchant", merchantProduct)
app.use("/api/blog",blogsection)
app.use("/api/authRider", authRiderUser)
app.use("/api/partner", partnerSection)
app.use("/api/payNow", payNowSection)



app.get("/", (req, res) => {
    res.json("IMANXpress Server")
});

app.listen(port, () => {
    console.log(`localhost running in ${port}`)
})
