const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/yelpcamp", {
	keepAlive: true
});

module.exports.User = require("./user");
module.exports.Comment = require("./comment");
module.exports.Campground = require("./campground");