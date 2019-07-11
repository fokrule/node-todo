var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodeParser = bodyParser.urlencoded({extended: false});
mongoose.connect('mongodb+srv://fokrule:fokrule@cluster0-kgefs.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
var todoSchema = new mongoose.Schema({
	item: String
}); 

var Todo = mongoose.model('Todo', todoSchema);

/*var itemOne = Todo({item:'testing note'}).save(function(err) {
	if (err) throw err;
	console.log('item saved');
})*/

module.exports = function(app){
    app.get('/',function(req, res){
        Todo.find({},function(err,data){
        	if (err) throw err;
        	console.log(data);
        	res.render('home',{notes: data});
        });
        //.render('home');
    });

    app.post('/', urlencodeParser, function(req, res){
    	console.log(req.body);
        var newTodo = Todo(req.body).save(function(err, data){
        	if (err) throw err;
        	res.json(data);
        });
    });
}