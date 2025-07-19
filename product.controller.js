// const Product = require('../Models/product.model')
const Product = require ('../Models/product.model')
const bcrypt = require ('bcrypt')
const createProduct = async(req , res)=>{
    try {
        const {name , description , price , quantity} = req.body
        const newProduct = new Product({
            name,
            description,
            price,
            quantity,
            owner: req.userId, 
          })
           await newProduct.save()
           return res.status(201).send({
            message : " product created" , 
            product : newProduct
           })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message : "internal server error"
        })
 }
}
 const getProducts = async ( req ,res)=>{
    try {
        const products = await Product.find({owner : req.userId})
        return res.status(200).send(products)

    } catch (error) {
        
        return res.status(500).send({
            message : " Internal server error"
        })
        
    }
 }

 const updateProducts = async(req , res)=>{
    try {
        const{name , description , price , quantity } = req.body
        const product = await Product.findOneAndUpdate(
            { _id: req.params.id, owner: req.userId },
            { name, description, price, quantity },
            { new: true }
          )
          if(!product){
             return res.status(404).send({
                message : "Product not found"
             })
          }
          return res.status(200).send({
            message : "Products are updated"
          })


    } catch (error) {
        return res.status(500).send({
            message : "Internal server error"
        })
        
    }
 }
  const deleteProduct = async (req , res)=>{
try {
    const product = await Product.findOneAndDelete({
        _id: req.params.id,
        owner: req.userId,
      })

      if(!product){
        return res.status(404).send({
            message : "product not found"

        })
      }
      return res.status(200).send({
        message : "Product deleted"
      })
    
} catch (error) {
    return res.status(500).send({
        message : "Internal seerver error"
    })
    
}
  }
module.exports = {createProduct , getProducts , updateProducts , deleteProduct}