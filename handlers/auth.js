const db = require("../models/index");
const jwt = require("jsonwebtoken");

exports.signUp = async function(req, res, next) {
	try{
		let user = await db.User.create(req.body);
		let {id, username, avatar} = user;
		let token = jwt.sign({
			id,
			username,
			avatar
		}, process.env.SECRET_KEY);
		return res.status(200).json({
			id, 
			username,
			avatar,
			token
		})
	} catch(e) {
		if(e.code === 11000) {
			e.message = "Sorry, that username and/or email has been taken";
		}
		return next({
			status: 400,
			message: e.message 
		})
	}
}

exports.signIn = async function(req, res, next) {
	try {
		let user = await db.User.findOne({
			email: req.body.email
		});
		let {id, username, avatar} = user;
		let isMatch = await user.comparePassword(req.body.password);
		if(isMatch) {
			let token = jwt.sign({
				id, 
				username,
				avatar
			}, process.env.SECRET_KEY);
			return res.status(200).json({
				id,
				username,
				avatar,
				token
			})
		} else {
			return next({
				status: 400,
				message: "Invalid email/password"
			})
		}
	} catch(e) {
		next({
			status: 400,
			message: "Invalid email/password"
		});
	}
 
}