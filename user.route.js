const express = require("express")
const Controllers  = require("../Controllers/user.controller")
// const {Auth} = require("../Middleware/Auth")
const auth = require('../Middleware/auth')
const router = express.Router();
router.get("/profile" , auth,Controllers.getProfile)
router.put("/profile" , auth,Controllers.updateProfile)
router.get("/view" , auth , Controllers.viewOrderHistory)

router.put("/settings" ,auth , Controllers.updateSettings)
router.post("/password", Controllers.handlePassword)



module.exports= router  

