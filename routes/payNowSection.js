const express = require("express");
const router = express.Router();
const SSLCommerzPayment = require("sslcommerz");
const { v4: uuidv4 } = require("uuid");
const order = require("../models/order");
const ObjectId = require("mongodb").ObjectId;
// get order by email
router.get("/ordersbyemail/:email", async (req, res) => {
  try {
    const ordersdata = await order.find({});
    const ordersdatabyemail = ordersdata.filter(
      (el) => el.cus_email == req.params.email
    );
    res.json(ordersdatabyemail);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error occured");
  }
});
// get all orders
router.get("/allorders", async (req, res) => {
  try {
    const allordersdata = await order.find({});
    res.json(allordersdata);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error occured");
  }
});

// get orders by merchants id
router.get("/getordersbymerchantid/:id", async (req, res) => {
  try {
    const allordersdata = await order.find({ merchant_id: req.params.id });
    res.json(allordersdata);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error occured");
  }
});
router.get("/getordersbyid/:id", async (req, res) => {
  try {
    const allordersdata = await order.find({ _id: req.params.id });
    res.json(allordersdata);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error occured");
  }
});

router.delete("/deleteorders/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const orderdata = await order.findByIdAndDelete(req.params.id);
    res.json({ success: "Order deleted successfully" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send("some error occured");
  }
});
// updating delivery status
router.put("/statusUpdate/:id", async (req, res) => {
  console.log(req.body);
  const filter = { _id: ObjectId(req.params.id) };
  console.log(req.params.id);
  const result = await order.updateOne(filter, {
    $set: {
      delivery_status: req.body.delivery_status,
    },
  });
  res.send(result);
  console.log(result);
});
// router.put("/statusUpdate/:id", async (req, res) => {
//   console.log(req.body);
//   await order.updateOne(
//     { _id: req.params.id },
//     {
//       $set: {
//         delivery_status: req.body.delivery_status,
//       },
//     }
//   );

//   res.json({ change: "ok" });
// });
// payment initialization
router.post("/init", async (req, res) => {
  const data = {
    tran_id: uuidv4(),
    merchant_id: req.body.merchant_id,
    total_amount: req.body.total_amount,
    payment_status: "Pending",
    delivery_status: "processing",
    cus_name: req.body.cus_name,
    cus_email: req.body.cus_email,
    cus_phone: req.body.cus_phone,
    product_details: req.body.product_details,
    cus_city: req.body.cus_city,
    note: req.body.note,
    cus_postcode: req.body.cus_postcode,
    streetAddress: req.body.streetAddress,
    currency: "BDT",
    success_url: "https://limitless-sea-74898.herokuapp.com/api/payNow/success",
    fail_url: "https://limitless-sea-74898.herokuapp.com/api/payNow/fail",
    cancel_url: "https://limitless-sea-74898.herokuapp.com/api/payNow/cancel",
    ipn_url: "https://limitless-sea-74898.herokuapp.com/api/payNow/ipn",
    shipping_method: "Courier",
    product_name: "none",
    product_image: "none",
    product_category: "none",
    product_profile: "none",
    cus_add1: "none",
    cus_add2: "none",
    cus_state: "Dhaka",
    cus_country: "Bangladesh",
    cus_fax: "none",
    ship_name: "none",
    ship_add1: "none",
    ship_add2: "none",
    ship_city: "none",
    ship_state: "none",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
    multi_card_name: "mastercard",
    value_a: "processing",
    value_b: "none",
    value_c: "none",
    value_d: "none",
  };
  console.log(data);
  // insert data
  const orderData = await order.create(data);

  const sslcommer = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASS,
    false
  ); //true for live default false for sandbox
  sslcommer.init(data).then((data) => {
    //process the response that got from sslcommerz
    //https://developer.sslcommerz.com/doc/v4/#returned-parameters
    if (data.GatewayPageURL) {
      res.json(data.GatewayPageURL);
    } else {
      return res.status(400).json({
        message: "Payment session failed",
      });
    }
  });
});
router.post("/success", async (req, res) => {
  const orders = await order.updateOne(
    { tran_id: req.body.tran_id },
    {
      $set: {
        val_id: req.body.val_id,
      },
    }
  );
  console.log(req.body.val_id);
  res
    .status(200)
    .redirect(`https://imanxpress247.web.app/success/${req.body.tran_id}`);
});
router.post("/fail", async (req, res) => {
  const orders = await order.deleteOne({ tran_id: req.body.tran_id });
  res.status(400).redirect(`https://imanxpress247.web.app/failed`);
});
router.post("/cancel", async (req, res) => {
  const orders = await order.deleteOne({ tran_id: req.body.tran_id });
  res.status(200).redirect(`https://imanxpress247.web.app/`);
});
router.post("/validate", async (req, res) => {
  console.log(req.body);
  const orders = await order.findOne({ tran_id: req.body.tran_id });

  if (orders.val_id === req.body.val_id) {
    const update = await order.updateOne(
      { tran_id: req.body.tran_id },
      {
        $set: {
          payment_status: "Success",
        },
      }
    );
    res.send(update.modifiedCount > 0);
  } else {
    res.send("Payment not confirmed. Order Discarded");
  }
});

router.get("/orders/:tran_id", async (req, res) => {
  const id = req.params.tran_id;
  const orders = await order.findOne({ tran_id: id });

  res.json(orders);
});

module.exports = router;
