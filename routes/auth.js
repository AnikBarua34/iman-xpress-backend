const express = require("express");
const router = express.Router();
const merchantUser=require("../models/merchantUser")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
let JWT_SECRET = "tushar457789"
const fetchmerchantuser = require("../middleware/fetchmerchantuser")



//user create route
router.post("/register", [
    body("name","Name must be up to 3 character").isLength({ min: 3 }),
    body("email","email is invalid").isEmail(),
    body("password","password must be up to 5 character").isLength({ min: 6 }),
], async(req,res) => {
   console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        let user = await merchantUser.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({error:"user email already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        let securedpass = await bcrypt.hash(req.body.password,salt)
       

        user = await merchantUser.create({
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            storeAddress: req.body.storeAddress,
            faceBookLink: req.body.faceBookLink,
            category: req.body.category,
            image: req.body.image,
            email: req.body.email,
            password: securedpass
//    name: 'ahmed',
//   mobileNumber: '4435',
//   storeAddress: 'b',
//   faceBookLink: 'safsaf',
//   email: 'ahmedasdf@a.com',
//   password: 'asfdsaf'
        });
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        res.json({ authToken })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
    
 
})

//user login route

router.post("/login", [
    body("email", "email is invalid").isEmail(),
    body("password", "password cannot be empty").exists()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body
        try {
            let user = await merchantUser.findOne({ email });

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
            res.json({authToken})

        } catch (err) {
            res.send(err) 
        }
    })

//update merchant profile
router.put("/updateprofile/:id", async (req, res) => {

    const mydata = req.body
    console.log(mydata)
    try {
        

        let data = await merchantUser.findById(req.params.id)
        if (!data) {
            return res.status(401).send("Not found")
        }


        let updateprofile= await merchantUser.findByIdAndUpdate(req.params.id, { $set: mydata }, { new: true })
        res.json({updateprofile})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }

})


//get user data from database
router.post("/getmerchantuser", fetchmerchantuser, async (req, res) => {
    try {
        userId = req.user.id
        const user = await merchantUser.findById(userId).select("-password")
        res.send(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    }
})
router.get("/getmerchantuser",async (req, res) => {
    try {
        
        const user = await merchantUser.find({})
        res.send(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    }
})

//get user data from database
router.get("/getmerchantuser/:id", async (req, res) => {
    try {
        userId = req.params.id
        const user = await merchantUser.findById(userId).select("-password")
        res.send(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    }
})

//get user data by category from database
router.get("/getmerchantuserbycategory/:category",async (req, res) => {
    try {
        const category= req.params.category
        const user = await merchantUser.find({category:category}).select("-password")
        res.send(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    }
})

module.exports=router