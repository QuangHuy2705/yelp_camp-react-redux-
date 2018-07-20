const express = require("express");
const router = express.Router({mergeParams: true});
const {createCampground, getCampground, deleteCampground} = require("../handlers/campground");
const {loginRequired, ensureCorrectUser} = require("../middleware/auth");

router.route("/").post(loginRequired, createCampground);

router.route("/:campground_id").get(getCampground);

router.route("/:campground_id").delete(loginRequired, ensureCorrectUser, deleteCampground);

module.exports = router;