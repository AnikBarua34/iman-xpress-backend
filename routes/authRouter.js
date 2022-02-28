const express = require("express")
const router = express.Router()


// Rider Register post
router.post('/register', async (req, res) => {
    console.log(req.body);
    res.json(req.body)
})

module.exports = router