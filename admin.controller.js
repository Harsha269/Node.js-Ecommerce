// const User = require("../Models/user.model")
const Admin = require('../Models/admin.model')
const User = require ("../Models/user.model")
// const User= require("../models/user.model")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const adminSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).send({
         message: "Admin already exists"
         })

    const admin = await Admin.create({ username, email, password });

    res.status(201).send({ 
        message: "Admin created successfully" 
    })
  } catch (error) {
    res.status(500).send({ message: "Server error" })
  }
}

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).send({
         message: "Admin not found"
         })

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).send({ 
        message: "Invalid password"  
    })

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.status(200).json({ token, message: "Login successful" })
  } catch (error) {
    res.status(500).json({ message: "Login failed" })
  }
}

const getAllUsers= async(req , res)=>{
    
    const users = await User.find({role :{ $ne: "admin" } })
  return  res.send(users)
}
   
const deleteUsers = async (req , res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).send({
        message : "User deleted"
    })
  
}


const editProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error updating product", error });
  }
};
module.exports = {adminSignup , adminLogin ,getAllUsers , deleteUsers , editProduct}