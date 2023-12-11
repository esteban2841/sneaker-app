
const express= require ( "express");
const morgan = require("morgan")
const productRouter = require("./routes/productRoutes")
const priceRouter = require("./routes/priceRoutes")

app = express()

console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))

}
//1) MIDDLEWARES
app.use(express.json())
app.use(express.static(`${__dirname}/public`))


app.use("/api/v1/products", productRouter)
app.use("/api/v1/price", priceRouter)

module.exports = app;
