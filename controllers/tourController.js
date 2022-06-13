// const fs = require("fs")
const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures")

// const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

// exports.checkID = (req, res, next, val)=>{
    //     console.log(`Tour id is: ${val}`)
    
    //     if(req.params.id *1 > tours.length){
        //         return res.status(404).json({
            //             status:"fail",
            //             message:"Invalid id"
            //         })
            //     }
            //     next()
            // }
            
            // exports.checkBody = (req, res , next)=>{
//     if (!req.body.name || !req.body.price){
    //         return res.status(400).json({
        //             status: "fail",
        //             message: "Missing name or price"
        //         })
        //     }
        //     next()
        // }
        
exports.aliasTopTours = (req, res, next)=>{
    req.query.limit = "5";
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty"
    next()

}



exports.getAllTours = async (req, res)=>{

    try{
        console.log(req.query)

        // //Building query 1A) filtering
        // queryObjs = {...req.query}
        // const excludedFields= ["page", "sort", "limit", "fields"]
        // excludedFields.forEach(el => delete queryObjs[el])
        // //1B) advanced filtering

        // // const tours = await Tour.find({
        // //     duration: 5,
        // //     difficulty:"easy"
        // // })
        // let queryStr = JSON.stringify(queryObjs)
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
       
        // let query = Tour.find(JSON.parse(queryStr));
        // //2)Sort
        // if(req.query.sort){
        //     const sortBy = req.query.sort.split(",").join(" ")
        //     query = query.sort(sortBy)
        //     //sort ("price ratingsAverage")
            
        // }else{
        //     query = query.sort("-createdAt")

        // }
        // //3) Field limiting
        // if(req.query.fields){
        //     const fields = req.query.fields.split(",").join(" ");
        //     query= query.select(fields)
        // }else{
        //     query = query.select("-__v")
        // }
        // //4) pagination

        // const page = req.query.page *1 || 1;
        // const limit = req.query.limit *1 || 100;
        // const skip = (page-1) * limit
        // query= query.skip(skip).limit(limit)

        // if(req.query.page){
        //     const numTours = await Tour.countDocuments()
        //     if(skip>=numTours) throw new Error("this page does not exists")
        // }
        // // query execution

        // const allTours = await query
       
        const features = new APIFeatures( Tour.find() , req.query ).filter().sort().selectionFields().paginate()
        const allTours = await features.query




        res.status(200).json({
            status: "success",
            results: allTours.length,
            data: {
                allTours,
            }
        })
    }catch(err){
        res.status(404).json({
            status : "fail",
            message:err
        })
    }

}

exports.createTour = async (req, res)=>{

    try{
        const newTour = await Tour.create(req.body)
        // console.log(req.body)
        // const newId = tours[tours.length -1].id + 1;
        // const newTour = Object.assign({id: newId}, req.body)
        // tours.push(newTour)
        // fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err=>{
            res.status(201).json({
                status:"success",
                data:{
                    tour: newTour
                }
            })
        // })
        
    }catch(err){
        res.status(400).json({
            status : "Failed",
            message: err
        })
    }
}

exports.getTour= async (req,res)=>{
    const id = req.params.id
    console.log(id)
    try{
        const tour = await Tour.findById(id)
        
        res.status(200).json({
            status: "success",
            data:{
                tour
            }
        })
    }catch (err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
}

exports.uptdateTour= async (req, res)=>{
    
    try{
        const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators: true
        }) 
        res.status(200).json({
            status: "success",
            data:{
                tour: updatedTour
            }
        })

    }catch(err){
        res.status(404).json({
            status:"fail",
            message:err
        })
    }
}
exports.deleteTour= async (req, res)=>{
    const id = req.params.id
    try{
        const bfDeleted = await Tour.findById(id)
        const deletedOne = await Tour.findByIdAndDelete(id)

        res.status(200).json({
            status: "success",
            data : bfDeleted
        })

    }catch (err){
        res.status(404).json({
            status: "fail",
            message: err
        })

    }
}
