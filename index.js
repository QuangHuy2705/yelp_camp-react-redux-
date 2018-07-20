require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const errHandler = require("./handlers/errors");
const authRoutes = require("./routes/auth");
const campgroundRoutes = require("./routes/campgrounds");
const commentRoutes = require("./routes/comments");
const db = require("./models");

const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

//routes
app.get("/api/campgrounds", async function(req, res, next) {
	try {
		let foundCampgrounds = await db.Campground.find().sort({createdAt: "desc"});
		return res.status(200).json(foundCampgrounds);
	} catch(e) {
		return next(e);
	}
});

app.use("/api/auth", authRoutes);

app.use("/api/users/:user_id/campgrounds", campgroundRoutes);

app.use("/api/users/:user_id/campgrounds/:campground_id/comments", commentRoutes);

app.use(function(req, res, next) {
	let err = new Error("Not found!");
	err.status = 404;
	next(err);
});

app.use(errHandler);

app.listen(PORT, function() {
	console.log(`Server is starting on PORT ${PORT}`);
});
