const db = require("../models");

exports.createCampground = async function(req, res, next) {
	
	try {
		let campground = await db.Campground.create({
			name: req.body.name,
			author: req.body.userId,
			description: req.body.description,
			imageUrl: req.body.imageUrl
		});
		let foundCampground = await db.Campground.findById(campground.id).populate("author", {
			username: true,
			avatar: true
		});

		return res.status(200).json(foundCampground);
	} catch(e) {
		return next(e);
	}
};

exports.getCampground = async function(req, res, next) {
	try{
		let foundCampground = await db.Campground.findById(req.params.campground_id);
		return res.status(200).json(foundCampground);
	} catch(e) {
		return next(e);
	};
};

exports.deleteCampground = async function(req, res, next) {
	try{	
		let foundCampground = await db.Campground.findById(req.params.campground_id);
		await foundCampground.remove();
		return res.status(200).json(foundCampground);
	} catch(e) {

	}
}