const express = require("express")
const router = express.Router();
const Controllers = require('../Controllers/admin.controller')
// const auth = require('../Middleware/auth')
const adminAuth = require('../Middleware/adminAuth')

router.post("/signup" , adminAuth ,Controllers.adminSignup)
router.post("/login" , adminAuth , Controllers.adminLogin)

router.get("/dashboard", adminAuth, (req, res) => {
  res.send("Welcome to Admin Dashboard")
})
// router.get("/users" , adminAuth, Controllers.getAllUsers)
// router.delete("/users/:id" , auth , Controllers.deleteUsers)
router.get("/users" , adminAuth , Controllers.getAllUsers)
router.put("/products/:id" , adminAuth , Controllers.editProduct)
module.exports = router
