var config = require('../config/server.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var urlencodeParser = bodyParser.urlencoded({extended: false});
var userSchema = new mongoose.Schema({
	email : {
		type : String,
		required : true	
	},
	password : {
		type : String,
		required : true			
	}
})

var User = mongoose.model('User', userSchema);

module.exports = function(app) {

	app.get('/register', function(req, res) {
		res.render('register');
	});	

	app.post('/register',urlencodeParser, function(req, res) {
		var newUser = new User({
			email : req.body.email,
			password: req.body.password
		});

		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(newUser.password, salt, function(err, hash){
				if (err) throw err;
				newUser.password = hash;
				newUser.save(function(err){
					if (err) throw err;
					console.log('registeres');
					res.redirect('/register');
				});
			});
		})
		/*var newUser = User(req.body).save(function(err, data){
			if (err) throw err;
			console.log('Registration successfull');
			res.render('register');
		});*/
	});

	app.get('/login', function(req, res) {
		res.render('login');
	});	

	app.post('/login',urlencodeParser, function(req, res) {
		console.log('Login successfull');
	});
}