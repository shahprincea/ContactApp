var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, resp){

	db.contactlist.find(function(err, docs){
		resp.json(docs)
	})
});

app.post('/contactlist', function(req, resp){
	//console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc){
		resp.json(doc);
	});
});

app.delete('/contactlist/:id', function(req, resp) {
	var id = req.params.id;
	//console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function(err, doc){
		resp.json(doc);
	});
	
});

app.get('/contactlist/:id', function(req, resp){
	var id = req.params.id;
	//console.log(id);
	db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function(err, doc){
		resp.json(doc);
	});
});

app.put('/contactlist/:id', function(req, resp){
	var id = req.params.id;
	//console.log(req.body.name);
	db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},
		update:{$set: {name: req.body.name, email: req.body.email, number:req.body.number}}, new: true}, function(err, doc){
			resp.json(doc);
		});	
});

app.listen(3000);
console.log("Server is running on port 3000");