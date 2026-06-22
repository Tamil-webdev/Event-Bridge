const express  = require("express")
const {getAllColleges, getCollegeById} = require("../controllers/college.controller")
const router = express.Router();

router.get("/", getAllColleges);
router.get("/:id", getCollegeById);

module.exports = router;
