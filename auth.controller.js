
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")
// const crypto = require("crypto");
// const User= require("../models/user.model")
const User = require("../Models/user.model")

// const { token } = require("morgan");
require("dotenv").config()
// let users = [];
const signup = async(req  , res)=>{
    try{
        const{confirmPassword,role = "user",...body} = req.body;
        console.log(body);
        
        if(body.password!== confirmPassword){
            return res.status(400).send({
                message : "password do not match"
            })}
    const existingUser = await User.findOne({email:body.email})   
    if(existingUser){
        return res.status(409).send({
            message:"user already exist"
        })}  
        const hashedPassword = await bcrypt.hash(body.password ,10) 
        // const newUser = {...body,
        //     password:hashedPassword,
        //     role,
        //    id:crypto.randomUUID(),}  
        // users.push(newUser)

        const user = await User.create ({...body,
            
            password:hashedPassword,
            role,
        })
        // await newUser.save();

        const token = jwt.sign({
            id: user._id.toString(),
        email: user.email,
        role: user.role,
         }, process.env.JWT_SECRET,

        // },process.env.JWT_KEY,
        {expiresIn:"4d"}
    )
        return res.status(201).send({
            message:"user created successfuly",
            token ,
             userId: user._id,
  role: user.role,
           
            
        })
    }catch(error){
        return res.status(500).send({
            message:error.message || "Internal server error"
        })
    }
}
const login=async(req , res)=>{
    try{
        const{email,password} = req.body;
        // const user = users.find((u) => u.email === email);
        console.log("Login attempt for a email" ,email);
        console.log(`Password received: "${password}"`);
        
        

    const user = await User.findOne({ email });

        if(!user){
            return res.status(401).send({
                message:"User not found"
            })
        }

         
    console.log(`Password hash in DB:, "${user.password}"`);

        // const validPassword = await bcrypt.compare(password, user.password);
        // console.log("password match result:",validPassword);
        

        // if(!validPassword){
            // return res.status(401).send({
                // message:"Invalid credential"
            // })
        // }
        
        const token = jwt.sign({id:user._id.toString() , 
            email:user.email ,
             role:user.role
            }, process.env.JWT_SECRET , {
            // },process.env.JWT_KEY,{
            expiresIn:"10d",
        })
        return res.status(200).send({
            message:"Login successful",
            token: token ,
            userId : user._id ,
            role : user.role
        })
    }catch(error){
        console.log(error);
        
        return res.status(500).send({
            message:error.message || "Internal server error"
        })
    }
}
const checkUser = (req , res)=>{
    return res.status(200).send({
        message:"User is valid" ,
        user: req.user
    })
}
module.exports={signup,login , checkUser}