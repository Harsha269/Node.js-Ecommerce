const express = require('express');
const Controllers = require('../Controllers/auth.controller');
// const auth = require('../Middleware/auth');

const router = express.Router(); 

router.post("/signup",  Controllers.signup);
router.post("/login",  Controllers.login);

module.exports = router; 
