const express = require("express")
const app = express();
const SSLCommerzPayment = require('sslcommerz')
require('dotenv').config()
var cors = require('cors')
const port = process.env.PORT || 5000

const authmerchantUser = require("./routes/auth")
const authRiderUser = require("./routes/authRider")
const merchantProduct = require("./routes/merchantproduct")
const blogsection = require("./routes/blogSection")

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



app.get("/", (req, res) => {
    res.json("IMANXpress Server")
});

// payment initialization 
app.get('/init', (req, res) => {
    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: 'REF123',
        success_url: 'http://localhost:5000/success',
        fail_url: 'http://localhost:5000/fail',
        cancel_url: 'http://localhost:5000/cancel',
        ipn_url: 'http://localhost:5000/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'cust@yahoo.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        multi_card_name: 'mastercard',
        value_a: 'ref001_A',
        value_b: 'ref002_B',
        value_c: 'ref003_C',
        value_d: 'ref004_D'
    };
    const sslcommer = new SSLCommerzPayment(process.env.STORE_ID,process.env.STORE_PASS,false) //true for live default false for sandbox
    sslcommer.init(data).then(data => {
        //process the response that got from sslcommerz 
        //https://developer.sslcommerz.com/doc/v4/#returned-parameters
       res.redirect(data.GatewayPageURL)
    });
})
app.post('/success', async(req,res)=>{
    console.log(req.body)
    res.status(200).json(req.body)
})
app.post('/fail', async(req,res)=>{
    console.log(req.body)
    res.status(400).json(req.body)
})
app.post('/cancel', async(req,res)=>{
    console.log(req.body)
    res.status(200).json(req.body)
})

app.listen(port, () => {
    console.log(`localhost running in ${port}`)
})
