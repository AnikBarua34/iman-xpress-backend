const express = require("express");
const router = express.Router();
const merchantProduct = require("../models/merchantProduct")
const fetchmerchantuser = require("../middleware/fetchmerchantuser")
const { body, validationResult } = require('express-validator');

//fetchall product from database
router.get("/fetchallproducts", fetchmerchantuser, async (req, res) => {
    try {
        const products = await merchantProduct.find({ user: req.user.id })
        res.json(products)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
    
})

//add product in database
router.post("/addproduct", fetchmerchantuser, [
    body("productname", "Name must be up to 3 character").isLength({ min: 3 }),
    body("productdescription", "description must be up to 3 character").isLength({ min: 10 }),
] ,async (req, res) => {
    
    const {productname,productprice,productdescription}=req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const productdata = new merchantProduct({
            productname, productprice, productdescription, productimage:"https://i.postimg.cc/fRm7BzJB/lunch3.png",merchantid:req.user.id  
        })

        const saveproduct = await productdata.save()
        
        res.json(saveproduct)
        
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})

//product update

router.put("/updateproduct/:id", fetchmerchantuser, async(req,res) => {
    
    const { productname, productprice, productdescription } = req.body
    try {
        const newdata = {}
        if (productname) {
            newdata.productname = productname
        }
        if (productprice) {
            newdata.productprice = productprice
        }
        if (productdescription) {
            newdata.productdescription = productdescription
        }

        let data = await merchantProduct.findById(req.params.id)
        if (!data) {
            return res.status(401).send("Not found")
        }

        if (data.merchantid.toString() !== req.user.id) {
            return res.status(401).send("Not found")
        }
        data = await merchantProduct.findByIdAndUpdate(req.params.id, { $set: newdata }, { new: true })
        res.json(data)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
    
})



//product delete

router.delete("/deleteproduct/:id", fetchmerchantuser, async (req, res) => {
    try {

        let data = await merchantProduct.findById(req.params.id)
        if (!data) {
            return res.status(401).send("Not found")
        }

        if (data.merchantid.toString() !== req.user.id) {
            return res.status(401).send("Not found")
        }
        data = await merchantProduct.findByIdAndDelete(req.params.id)
        res.json({ "Success": "product deleted successfully", data: data })
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
   
})

module.exports = router

