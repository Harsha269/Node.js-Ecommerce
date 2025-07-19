// const User = require("../models/user.model");
const User = require("../Models/user.model")
const Order = require('../Models/order.model')
const bcrypt = require('bcrypt')
require ('dotenv').config()
const jwt = require('jsonwebtoken')

const getProfile = async (req, res) => {
  try {
    const userProfile = await User.findById(req.user.id).select("-password");

    if (!userProfile) {
      return res.status(404).send({
        message: "User not found",
      });
    }

    res.status(200).send(userProfile);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Internal server error",
    })
  }
}

const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({
      message: "Could not update profile",
    });
  }
}



// const viewOrderHistory = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).populate("orders.product", "name price");

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     res.status(200).send(user.orders);
//   } catch (error) {
//     console.log(error);
    
//     res.status(500).send({ message: "Error fetching order history" });
//   }
// }

const viewOrderHistory = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId).populate("orders.product");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ orders: user.orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching order history" });
  }
}


// const updateSettings = async (req, res) => {
//   try {
//     const { theme, notifications } = req.body;

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       { settings: { theme, notifications } },
//       { new: true }
//     ).select("-password");

//     res.status(200).send(updatedUser.settings);
//   } catch (error) {
//     res.status(500).send({ message: "Could not update settings" });
//   }
// }
const updateSettings = async (req, res) => {
  try {
    console.log("Hit /settings route");

    const userId = req.user.id;
    const { name, email } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!updatedUser) return res.status(404).send({ 
      message: "User not found" 
    })

    res.status(200).send({ 
      message: "Settings updated", 
      user: updatedUser
     })
  } catch (error) {
    console.error("Update Settings Error:", error);
    res.status(500).send({ message: "Internal server error" 

    })
  }
}



const handlePassword = async (req, res) => {
  const { email, newPassword, token } = req.body

  try {
    if (!token) {
      
      const user = await User.findOne({ email })

      if (!user) {
        return res.status(404).send({
           message: "User not found" 
          })
      }

      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '15m' });

      
      return res.status(200).json({
        message: "Reset token generated",
        resetToken, 
      })
    } else {
      
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.findByIdAndUpdate(decoded.id, { password: hashedPassword })

      return res.status(200).json({ 
        message: "Password successfully reset"
       })
    }
  } catch (error) {
    return res.status(500).send({ 
      message: error.message
     })
  }
}



   

module.exports = {
  getProfile,
  updateProfile,
  viewOrderHistory ,
  updateSettings ,
   handlePassword
  
}
