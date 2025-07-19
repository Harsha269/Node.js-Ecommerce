const express = require('express')
const router = express.Router()
const Controllers = require("../Controllers/product.controller")
const auth = require("../Middleware/auth")
router.post("/products" , auth,Controllers.createProduct)
router.get("/" , auth , Controllers.getProducts)
router.put("/products/:id" , auth , Controllers.updateProducts)
router.delete("/products/:id" , auth , Controllers.deleteProduct)
module.exports = router ;
