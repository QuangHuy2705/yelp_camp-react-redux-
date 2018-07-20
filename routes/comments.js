const express = require("express");
const router = express.Router({mergeParams: true});
const {getComments, createComment, deleteComment} = require("../handlers/comment");
const {loginRequired, ensureCorrectUser} = require("../middleware/auth.js");

router.route("/")
	.get(getComments)
	.post(loginRequired, createComment);

router.route("/:comment_id")
	.delete(loginRequired, ensureCorrectUser, deleteComment)

module.exports = router;
