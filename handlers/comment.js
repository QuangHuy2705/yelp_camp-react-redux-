const db = require("../models");

exports.getComments = async function(req, res, next) {
	try {

		let foundCampground = await db.Campground.findById(req.params.campground_id).populate("comments", {
			author: true,
			date: true,
			text: true
		});
		return res.status(200).json(foundCampground.comments);

	} catch(e) {
		return next(e);
	}
};

exports.createComment = async function(req, res, next) {
	try {
		let newCommnent = await db.Comment.create({
			text: req.body.text,
			author: {
				id: req.body.currentUser.user.id,
				username: req.body.currentUser.user.username
			},
			campground: req.body.campground_id
		});
		let foundCampground = await db.Campground.findById(req.body.campground_id);
		foundCampground.comments.push(newCommnent.id);
		await foundCampground.save()
		let foundComment = await db.Comment.findById(newCommnent.id);
	return res.status(200).json(foundComment);
	} catch(e) {
		return next(e)
	}
};


exports.deleteComment = async function(req, res, next) {
	try{
		let foundComment = await db.Comment.findById(req.params.comment_id);
		await foundComment.remove();
		return res.status(200).json(foundComment.id);
	} catch(e) {
		return next(e);
	}
}