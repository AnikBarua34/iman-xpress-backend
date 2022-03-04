const express = require("express");
const router = express.Router();
const general = require("../models/generalUser");

router.post("/saveuser", async (req, res) => {
    console.log(req.body)
    try {
        


        user = await general.create({
           
            email: req.body.email,
            password: req.body.password,
            role:req.body.role
           
        });
      
        res.json({success:"registration successfully" })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})

router.get("/getuserdata/:email", async (req, res) => {
    const myemail=req.params.email
console.log(myemail)
    user = await general.findOne({ email: myemail })
    
    res.json(user)
})



module.exports = router