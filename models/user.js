const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
	username: {type: String, unique: true, required: true},
	password: {type: String, required: true},
	avatar: {type: String},
	email: {type: String, unique: true, required: true},

});

userSchema.pre("save", async function(next) {
	try{
		if(!this.isModified("password")) {
			return next();
		} else {
			let hashedPassword = await bcrypt.hash(this.password, 10);
			this.password = hashedPassword;
			return next();
		}
	} catch(e) {
		return next(e);
	}
});

userSchema.methods.comparePassword = async function(candidatePassword, next) {
	try {
		let isMatch =  bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch(e) {
		return next(e);
	}
}

const User = mongoose.model("User", userSchema);

module.exports = User;

