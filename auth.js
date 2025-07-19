const jwt = require("jsonwebtoken");
// const User = require("../models/user.model");
const User = require("../Models/user.model")
const mongoose = require('mongoose')
// const { default: mongoose } = require("mongoose");
// const { users } = require("../Controllers/auth.controller");
require("dotenv").config();

const Auth = async (req, res, next) => {
    try {
  const bearerToken = req.headers.authorization;
console.log(bearerToken);

  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return res.status(401).send({
      message: "Unauthorized: No token provided",
    })
  }

  const token = bearerToken.split(" ")[1];
  // process.env.JWT_KEY

    const decoded = jwt.verify(token,  process.env.JWT_SECRET);
    // req.userId = decoded.id
    
console.log("Decoded JWT" , decoded) ;

 
// if(!mongoose.Types.ObjectId.isValid(decoded.sub)){
if(!mongoose.Types.ObjectId.isValid(decoded.id)){

  return res.status(400).send({
    message : "Invalid user Id in token"

  })
}

    const user = await User.findById(decoded.id)
    // const user = await User.findById(decoded.sub)
    // const user = users.find((u)=>u.id === decoded.sub)
    if (!user) {
      return res.status(401).send({
        message: "Unauthorized: user not found",
      })
    }
    // if(allowedRoles.length > 0 && !allowedRoles.includes(user.role)){
      // return res.status(403).send({
        // message :"Forbidden: access denied"
      // })
    // }

    req.user = user;
    req.userId =user._id;
    req.userRole = user.role;
    next()
  } catch (error) {
    console.log(error);
    
    return res.status(401).send({
      message: "Unauthorized: Invalid token",
    })
  }
}

module.exports = Auth;
