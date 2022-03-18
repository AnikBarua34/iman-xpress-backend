const express = require("express")
const { body, validationResult } = require('express-validator');
const Rider = require("../models/RiderUser");
const router = express.Router()
const bcrypt = require('bcryptjs');



//product update

router.post("/updateRider/:email",[
   
    body("email","email is invalid").isEmail(),
   
],  async (req, res) => {
    const queryEmail = req.params.email
    const { fname, lname, mobile, address, riderState, email } = req.body
    console.log(req.body);
//   validation
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}


try {
        const newData = {}
        if (fname) {
            newData.fname = fname
        }
        if (lname) {
            newData.lname = lname
        }
        if (mobile) {
            newData.mobile = mobile
        }
        if (address) {
            newData.address = address
        }
        if (riderState) {
            newData.riderState = riderState
        }
        if (email) {
            newData.email = email
        }
       

//    update many data

       result = await Rider.updateMany({queryEmail:email}, { $set: newData }, { new: true })
        res.json(result)
    } catch (err) {
        
        res.status(500).send("Some error Occurred")
    }
    
})

// update rider password
router.post("/updateRiderPass/:email",[  
    
    body("password","password must be up to 5 character").isLength({ min: 6 }),
],  async (req, res) => {
    const email = req.params.email
    console.log(email);
    const { password } = req.body
    console.log(req.body);

//   validation
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}

// secured password
const salt = await bcrypt.genSalt(10);
let hashSecuredPass = await bcrypt.hash(password,salt)
try {
    const newData = {
            password : hashSecuredPass
        }

//    update data
  
       result = await Rider.updateOne({email}, { $set: newData }, { new: true })
        res.json(result)
    } catch (err) {
        
        res.status(500).send("Some error Occurred")
    }
    
})

// update rider image
router.post("/updateImage/:email",  async (req, res) => {
    const email = req.params.email
    console.log(email);
    const { image } = req.body
    console.log(req.body.image);

// //   validation
// const errors = validationResult(req);
// if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
// }

// try {
//     const newData = {
//             image : image
//         }

// //    update data
  
//        result = await Rider.updateOne({email}, { $set: newData }, { new: true })
//         res.json(result)
//     } catch (err) {
        
//         res.status(500).send("Some error Occurred")
//     }
    
})

//get riders by id
router.get("/getriderbyid/:id", async (req, res) => {
    try {
     
        const riderinfo = await Rider.findById(req.params.id).select("-password")
      
        res.json({rider:riderinfo})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("Internal server error")
    } 
})

//get all riders
router.get("/getallriders", async (req, res) => {
    try {
     
        const allrider = await Rider.find({}).select("-password")
        
        res.json({riders:allrider})
    } catch (err) {
       
        res.status(500).send("Internal server error")
    } 
})


module.exports = router;