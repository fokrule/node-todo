var config = require('../config/server.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
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
		var newUser = User(req.body).save(function(err, data){
			if (err) throw err;
			console.log('Registration successfull');
			res.render('register');
		});
	});

	app.get('/login', function(req, res) {
		res.render('login');
	});	

	app.post('/login',urlencodeParser, function(req, res) {
		console.log('Login successfull');
	});
}