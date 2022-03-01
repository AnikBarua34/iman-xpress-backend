const express = require("express")
const { body, validationResult } = require('express-validator');
const Rider = require("../models/RiderUser");
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchRider = require("../middleware/fetchRider");
let JWT_SECRET = 'tushar457789'

// DB_USER=imanxpress
// DB_PASS=2jRa9Z0DfNlvvDsS

// Rider Register post
router.post("/register", [
   
    body("email","email is invalid").isEmail(),
    body("password","password must be up to 5 character").isLength({ min: 6 }),
], async(req,res) => {
   console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await Rider.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({error:"user email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        let hashSecuredPass = await bcrypt.hash(req.body.password,salt)
       

        user = await Rider.create({
            fname: req.body.fname,
            lname: req.body.lname,
            mobile: req.body.mobile,
            city: req.body.city,
            bikeRider: req.body.bikeRider,
            foodDelivery: req.body.foodDelivery,
            parcelDelivery: req.body.parcelDelivery,
            medicineDelivery: req.body.medicineDelivery,
            email: req.body.email,
            password: hashSecuredPass
        });
        const data = {
            user: {
                id: user.id
            }
        }
        
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({  authToken })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
    
 
})

// login Rider Route
router.post("/login",
    async (req, res) => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body
        try {
            let user = await Rider.findOne({ email });

            if (!user) {
                return res.status(400).json({ error: "please try to login with correct credentials" });
            }
            const passwordcompare = await bcrypt.compare(password, user.password)
            if (!passwordcompare) {
                return res.status(400).json({ error: "please try to login with correct credentials" })
            }
           
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            res.json({ authToken })

        } catch (err) {
            res.send(err)
        }
    })


    //get user data from database
router.post("/getRider", fetchRider, async (req, res) => {
    // console.log(req.body);
    try {
        userId = req.user.id
        const user = await Rider.findById(userId).select("-password")
        console.log(user);
        res.send(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    }
})
module.exports = router