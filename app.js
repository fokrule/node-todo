var express = require('express');
var app = express();
var todoController = require('./controllers/todoController');
var userController = require('./controllers/userController');
app.set('view engine', 'ejs');
app.use(express.static('./public'));
todoController(app);
userController(app);
app.listen(2000);