const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const campgroundSchema = new mongoose.Schema({
	name: {type: String, required: true},
	imageUrl: {type: String, required: true},
	description: {type: String},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
}, {
	timestamps: true
});


const Campground = mongoose.model("Campground", campgroundSchema);

module.exports = Campground;