const express = require("express")
const router = express.Router();
const productController = require("../controllers/productController")
const { getAllAvailableProducts } = productController

// router.param("id", checkID)

router.route("/").get( getAllAvailableProducts )


module.exports = router;