var dbConfig = require('../config/server.js');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var urlencodeParser = bodyParser.urlencoded({extended: false});
mongoose.connect(dbConfig.url, {useNewUrlParser: true});
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

    app.get('/edit/:id', function(req, res){
    	var note = Todo.find({_id: req.params.id},function(err, data){
    		if (err) throw err;
    		res.render('edit',{data : data})
    	});
    });
    app.post('/edit', urlencodeParser, function (req, res) {
    	var id = req.body.id;
    	var note = req.body.note;
    	Todo.updateOne({_id: id},{item: note}, function(err, data){
    		if (err) throw err;
    		res.json(data);
    	});
    });
}