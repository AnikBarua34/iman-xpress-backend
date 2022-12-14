var jwt = require("jsonwebtoken");
let JWT_SECRET = "tushar457789";

const fetchRider = (req, res, next) => {
  // rider token from client side from here
  const token = req.header("Authorization");
  // console.log("token", token);

  if (!token) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data);
    req.user = data.user;
    // console.log('user',req.user);
    next();
  } catch (err) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }
};
module.exports = fetchRider;
