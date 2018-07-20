const mongoose = require("mongoose");
const db = require("./index");

const commentSchema = new mongoose.Schema({
	text: {
		type: String
	},
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	campground: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Campground"
	}
}, {
	timestamps: true
});

commentSchema.pre("remove", async function(next) {
	try {
		let campground = await db.Campground.findById(this.campground);
		campground.comments.remove(this.id);
	} catch(e) {
		next(e);
	}
})

module.exports= mongoose.model("Comment", commentSchema);