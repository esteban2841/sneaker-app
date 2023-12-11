const express = require("express")

const router = express.Router();
const priceControler = require("../controllers/priceController")
const { getSpecialPriceByUserIdAndProductName } = priceControler



router.route("/:userId/:productName").get(getSpecialPriceByUserIdAndProductName)

module.exports = router

