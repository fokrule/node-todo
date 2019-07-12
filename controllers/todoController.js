var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodeParser = bodyParser.urlencoded({extended: false});
mongoose.connect('mongodb+srv://fokrule:fokrule@cluster0-kgefs.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true});
var todoSchema = new mongoose.Schema({
	item: String
}); 

var Todo = mongoose.model('Todo', todoSchema);



module.exports = function(app){
    app.get('/',function(req, res){
        Todo.find({},function(err,data){
        	if (err) throw err;
            
        	res.render('home',{notes: data});
        });
        //.render('home');
    });

    app.post('/', urlencodeParser, function(req, res){
        var newTodo = Todo(req.body).save(function(err, data){
        	if (err) throw err;
        	res.json(data);
        });
    });

    app.delete('/:id', function(req, res){
      
        Todo.find({_id: req.params.id}).deleteOne(function(err, data){
            if (err) throw err;
            res.json(data);
        });
    });
}