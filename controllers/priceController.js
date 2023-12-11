const mongoose = require("mongoose")
const Product = require('../models/productModel')

exports.getSpecialPriceByUserIdAndProductName = async ( req, res )=>{
    try{
        const {userId, productName} = req.params

        const product = await Product.aggregate([
            
            { $match: { name: productName, stock:{ $gt : 0 } } },
            { $unwind: "$specialPrices" },
            { $match: { "specialPrices.userId": mongoose.Types.ObjectId(userId) } }
        ]);
        console.log("🚀 ~ file: priceController.js:14 ~ exports.getSpecialPriceByUserIdAndProductName= ~ product:", product)
 
        if (!product || product.length === 0) {
            const product = await Product.aggregate([
            
                { $match: { name: productName, stock:{ $gt : 0 } } },
            ]);
            return res.status(200).json({
                status: "success",
                specialPrice: product[0].price
            })
        }

        res.status(200).json({
            status: "success",
            specialPrice: product[0].specialPrices.price
        })
    }catch(err){
        res.status(404).json({
            status : "fail",
            message:err
        })
    }

}