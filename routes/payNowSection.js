const express = require("express");
const router = express.Router();
const SSLCommerzPayment = require('sslcommerz')
const { v4: uuidv4 } = require('uuid');
const payNow = require("../models/payNow")



// payment initialization 
router.post('/init', async (req, res) => {
   console.log(req.body);
    

//     const data = {
//         total_amount: req.body.total_amount,
//         currency: 'BDT',
//         tran_id: uuidv4(),
//         success_url: 'http://localhost:8080/api/payNow/success',
//         fail_url: 'http://localhost:8080/api/payNow/fail',
//         cancel_url: 'http://localhost:8080/api/payNow/cancel',
//         ipn_url: 'http://localhost:8080/api/payNow/ipn',
//         shipping_method: 'Courier',
//         payment_status:'Pending',
//         product_name: req.body.product_name,
//         product_image: req.body.product_image,
//         product_category: 'Electronic',
//         product_profile: req.body.product_profile,
//         cus_name: req.body.cus_name,
//         cus_email: req.body.cus_email,
//         cus_add1: 'Dhaka',
//         cus_add2: 'Dhaka',
//         cus_city: 'Dhaka',
//         cus_state: 'Dhaka',
//         cus_postcode: '1000',
//         cus_country: 'Bangladesh',
//         cus_phone: '01711111111',
//         cus_fax: '01711111111',
//         ship_name: 'Customer Name',
//         ship_add1: 'Dhaka',
//         ship_add2: 'Dhaka',
//         ship_city: 'Dhaka',
//         ship_state: 'Dhaka',
//         ship_postcode: 1000,
//         ship_country: 'Bangladesh',
//         multi_card_name: 'mastercard',
//         value_a: 'ref001_A',
//         value_b: 'ref002_B',
//         value_c: 'ref003_C',
//         value_d: 'ref004_D'
//     };
// // insert data 
//     const orderData = await payNow.create(data);

// const sslcommer = new SSLCommerzPayment(process.env.STORE_ID,process.env.STORE_PASS,false) //true for live default false for sandbox
// sslcommer.init(data).then(data => {
   
 
//     //process the response that got from sslcommerz 
//     //https://developer.sslcommerz.com/doc/v4/#returned-parameters
//     if(data.GatewayPageURL){
//         res.json(data.GatewayPageURL)
//     }
//     else{
//         return res.status(400).json({
//             message: 'Payment session failed'
//         })
//     }
// });
  
})
router.post('/success', async(req,res)=>{
    const order = await payNow.updateOne({tran_id: req.body.tran_id},{
        $set:{
            val_id:req.body.val_id
        }
    })
   console.log(req.body.val_id);
    res.status(200).redirect(`http://localhost:3000/success/${req.body.tran_id}`)
})
router.post('/fail', async(req,res)=>{
   const order = await payNow.deleteOne({tran_id:req.body.tran_id})
    res.status(400).redirect(`http://localhost:3000/failed`)
})
router.post('/cancel', async(req,res)=>{
    const order = await payNow.deleteOne({tran_id:req.body.tran_id})
    res.status(200).redirect(`http://localhost:3000`)
})
router.post('/validate', async (req,res)=>{
    console.log(req.body);
    const order = await payNow.findOne({tran_id: req.body.tran_id});
    console.log(order);
    if(val_id === req.body.val_id){
        const update = await payNow.updateOne({tran_id: req.body.tran_id},{
            $set: {
                payment_status: 'Success'
            }
        })
        res.send(update.modifiedCount>0)
    }
    else{
        res.send('Payment not confirmed. Order Discarded')
    }
});

router.get('/orders/:tran_id', async (req,res)=>{
    const id = req.params.tran_id;
    const order = await payNow.findOne({tran_id: id});
   
    res.json(order)
})

module.exports = router
