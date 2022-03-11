const express = require("express");
const router = express.Router();
const blog = require("../models/blog")
const { body, validationResult } = require('express-validator');


//add blog in database
router.post("/addblog", [
    body("title", "Name must be up to 8 character").isLength({ min: 8 }),
    body("description", "description must be up to 10 character").isLength({ min: 10 }),
], async (req, res) => {

    const { title, description, image,category, time } = req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const blogdata = new blog({
            title, description, image,category,time
        })

        const blogadd = await blogdata.save()

        res.json({ success: "your blog add successfully" })

    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})



//fetch blog in database
router.get("/fetchblog", async (req, res) => {

    try {
        const blogdata = await blog.find({})
       
        
        res.json(blogdata)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})


//fetch blog  by id from database
router.get("/fetchblog/:id", async (req, res) => {

    try {
        const blogdata = await blog.find({})
        const blogdatabyid = await blogdata.find((el) => el._id ==req.params.id)
        res.json(blogdatabyid)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})


//fetch blog  by category from database
router.get("/fetchblogbycategory/:category", async (req, res) => {

    try {
        const blogdata = await blog.find({})
        const blogdatabyid = await blogdata.filter((el) => el.category == req.params.category)
        res.json(blogdatabyid)
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})

//delete blog in database
router.delete("/deleteblog/:id", async (req, res) => {

    try {
        const blogdata = await blog.findByIdAndDelete(req.params.id)
        res.json({success:"blog delete successfully"})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }
})


//blog update

router.put("/updateblog/:id", async (req, res) => {

    const { title, description, image } = req.body
    try {
        const newdata = {}
        if (title) {
            newdata.title= title
        }
        if (description) {
            newdata.description = description
        }
        if (image) {
            newdata.image = image
        }

        let data = await blog.findById(req.params.id)
        if (!data) {
            return res.status(401).send("Not found")
        }

        
        let updatedata = await blog.findByIdAndUpdate(req.params.id, { $set: newdata }, { new: true })
        res.json({success:"blog updated successfully",updatedata})
    } catch (err) {
        console.log(err.message)
        res.status(500).send("some error occured")
    }

})

module.exports = router