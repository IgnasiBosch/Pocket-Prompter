// Dependencies
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var restful = require('node-restful');

// MongoDB
mongoose.connect('mongodb://localhost/commandGlossaryApp');

//var t = restful.mongoose;
// Model
//var commandSchema = new t.Schema({
//    command: String,
//    description: String,
//    tags: [String]
//});
//var command = restful.model('Command', commandSchema);

// Config
var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Resources
var Resource = app.resource = restful.model('Command', mongoose.Schema({
    command: String,
    description: String,
    tags: [String]
}))
    .methods(['get', 'post', 'put', 'delete']);

// Routes
app.get('/tags', function(req, res){
    Resource.find().distinct('tags', function(error, items){
        res.send(items);
    })
});

app.post('/search', function(req, res){
    var tags = req.body.tags.split(',');
    Resource.find({'tags': {$all : tags}}, function(error, items){
        res.send(items);
    })
});

Resource.before('post', build_tag_array)
    .before('put', build_tag_array);
Resource.register(app, '/command');
//command.methods(['get', 'put', 'post', 'delete']);
//command.register(app, '/command');

// Helper
function build_tag_array(req, res, next) {
    req.body.tags = req.body.tags.split(',');
    next();
}

// Run server
app.listen(3001);
console.log('Server running on port 3000...');