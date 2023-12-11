const mongoose = require("mongoose")
const APIFeatures = require("../utils/apiFeatures")
const Product = require('./../models/productModel')

exports.getAllAvailableProducts = async (req, res)=>{
    try{
        const productsWithStock = await Product.aggregate([
            {
                $match: {stock:{ $gt : 0 } }
            },
        ])

        res.status(200).json({
            status: "success",
            data: {
                productsWithStock,
            }
        })
    }catch(err){
        res.status(404).json({
            status : "fail",
            message:err
        })
    }

}