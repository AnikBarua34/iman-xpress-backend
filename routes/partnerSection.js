const express = require("express");
const router = express.Router();
const partner = require("../models/partner")
const { body, validationResult } = require('express-validator');


//add blog in database
router.post("/addPartner", async (req, res) => {

    const { image} = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const imageData = new partner({ image })

        const imageAdd = await imageData.save()

        res.json({ success: "your Images added successfully" })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})



//fetch blog in database
router.get("/getPartner", async (req, res) => {

    try {
        const imagedata = await partner.find({})
       
        
        res.json(imagedata)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})


//fetch blog  by id from database
router.get("/getPartner/:id", async (req, res) => {

    try {
        const imagedata = await partner.find({})
        const imagedatabyid = await imagedata.find((el) => el._id ==req.params.id)
        res.json(imagedatabyid)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})

//delete blog in database
router.delete("/deletePartner/:id", async (req, res) => {

    try {
        const blogdata = await partner.findByIdAndDelete(req.params.id)
        res.json({success:"partner deleted successfully"})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})


//blog update

router.put("/updatePartner/:id", async (req, res) => {

    const { image } = req.body
    try {
        if (image) {
            newdata.image = image
        }

        let data = await partnerImage.findById(req.params.id)
        if (!data) {
            return res.status(401).send("Not found")
        }

        
        let updatedata = await partnerImage.findByIdAndUpdate(req.params.id, { $set: newdata }, { new: true })
        res.json({success:"image updated successfully",updatedata})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }

})

module.exports = router