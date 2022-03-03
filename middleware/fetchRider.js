var jwt = require('jsonwebtoken');
let JWT_SECRET = "tushar457789"

const fetchRider = (req, res, next) => {

    // rider token from client side
    const token = req.body.headers.Authorization.split(" ")[1]
    console.log(token);
    
    if (!token) {
        res.status(401).send({error:"please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        console.log(data)
        req.user = data.user
        next()  
    } catch (err) {
        res.status(401).send({ error: "please authenticate using a valid token" }) 
    }
    
}
module.exports = fetchRider;