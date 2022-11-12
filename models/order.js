const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
  tran_id: {
    type: String,
    required: false,
  },
  merchant_id: {
    type: String,
    required: false,
  },
  payment_status: {
    type: String,
    required: false,
  },
  delivery_status: {
    type: String,
    required: true,
  },
  total_amount: {
    type: Number,
    required: false,
  },
  val_id: {
    type: String,
    required: false,
  },
  cus_name: {
    type: String,
    required: false,
  },
  cus_email: {
    type: String,
    required: false,
  },
  cus_phone: {
    type: String,
    required: false,
  },
  product_details: {
    type: [],
    required: false,
  },
  cus_city: {
    type: String,
    required: false,
  },
  note: {
    type: String,
    required: false,
  },
  cus_postcode: {
    type: String,
    required: false,
  },
  currency: {
    type: String,
    required: false,
  },
  streetAddress: {
    type: String,
    required: false,
  },
  currency: {
    type: String,
    required: false,
  },
  shipping_method: {
    type: String,
    required: false,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

const order = mongoose.model("Order", OrderSchema);
module.exports = order;
