const express = require("express")

const router = express.Router();
const userControllers = require("../controllers/userController")
const { getAllUsers,createUser,getUser,updateUser,deleteUser } = userControllers



router.route("/").get(getAllUsers).post(createUser)
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router

