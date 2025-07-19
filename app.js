// const expess = require("express")
// require('dotenv').config();
// require('dotenv').config({ path: '../.env' })

require('dotenv').config();

const express = require("express")
// require("dotenv").config();

const cors = require("cors")
const createDatabaseConnection = require("./Configure/db");
const env = require("./env");

// const todoRoutes =require("./Route/todo.route")
const authRoutes = require("./Route/auth.route")
const userRoutes = require ("./Route/user.route")
// const productRoutes = require("./Route/product.route")
const productRoutes = require("./Route/product.route")
const adminRoutes = require("./Route/admin.route")
createDatabaseConnection();
const app = express();
app.use(cors());
app.use(express.json())
// app.use("/" ,todoRoutes)

app.use("/" , authRoutes)
app.use("/" , userRoutes)
// app.use("/" , productRoute)
app.use("/" , productRoutes)
app.use("/" , adminRoutes)

const PORT = process.env.PORT||8081
const server = app.listen(PORT ,()=>{
    console.log(`Server running on port ${PORT}`);
    
})

// app.listen(env.port , ()=>{
//     console.log(`Example  app listening on port ${env.port}`);
    
// });