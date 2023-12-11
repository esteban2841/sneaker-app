const mongoose = require("mongoose")
const dotenv = require("dotenv");
dotenv.config({path : "./config.env"});

const app = require("./app");

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD )
dataBaseName = 'sneaker-app'
mongoose.connect(DB, {
    autoIndex: true,
    dbName:dataBaseName

}).then(con => {
    con
})



const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`App running on port ${port}...`)
});

