const fs = require("fs")
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModel")

dotenv.config({path : "./config.env"});
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    autoIndex: true,
    

}).then(con => {
    con
})

mongoose.connection.on('open', function (ref) {
    mongoose.connection.db.listCollections().toArray(function(err, names){
        console.log(names)
    })
 })
