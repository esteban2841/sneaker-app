const express = require("express")
const router = express.Router();
const tourController = require("../controllers/tourController")
const {getAllTours,createTour,getTour,uptdateTour,deleteTour, checkID, checkBody, aliasTopTours} = tourController

// router.param("id", checkID)

router.route("/top-5-cheap").get(aliasTopTours, getAllTours)
router.route("/").get(getAllTours).post( createTour)
router.route("/:id").get(getTour).patch(uptdateTour).delete(deleteTour)

module.exports = router;