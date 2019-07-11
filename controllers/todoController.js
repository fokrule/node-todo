var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodeParser = bodyParser.urlencoded({extended: false});
var t = mongoose.connect('mongodb+srv://fokrule:fokrule@cluster0-kgefs.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});


module.exports = function(app){
    app.get('/',function(req, res){
        console.log('dd');
        res.render('home');
    });

    app.post('/', urlencodeParser, function(req, res){
        console.log(req.body);
        res.render('home', {data : req.body});
    });
}