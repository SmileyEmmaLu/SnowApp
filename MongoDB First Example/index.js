var express = require("express");
var colors = require("colors");
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var snowSchema = mongoose.Schema({
	inches : Number,
	location: String,
	date: Date
});



var Snow = mongoose.model('Snow', snowSchema);

var promise = mongoose.connect('mongodb://localhost',{
 useMongoClient: true
}, function(err){
	if(err){
		throw err;
	}else{
		console.log("Database connection successful".trap.rainbow);
	}
});

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
 
app.get('/', function(req, res){
	res.sendFile(__dirname + "/index.html");
});


//app.post("/showSnow", function())
// app.get('/mOARSNOW', function(req, res) {
// 	Snow.create({inches : Math.random()*45},
// 		function(err, data){
// 			if(err){
// 				throw err;
// 			}else{
// 				res.send(data[0].inches + " inches of snow");
// 				console.log(data);
// 			}

// 	});
// });

app.post('/showSnow', function(req, res){
	console.log(req.body.isDelete==undefined);
	if(req.body.isDelete == undefined){
			Snow.update({location: req.body.locationto, date: req.body.date},{inches: req.body.height},{upsert: true},
		function(err, data){
			if(err){
				
				throw err;
				
				}else{
					// if (data[0] == null){
					// 	console.log(data);
					// 	res.send("Data is null");
					// }else{
					res.send(""+ req.body.height);
					console.log(data);
				// }
			}
		});
	}
	else{
		Snow.deleteOne({location: req.body.locationto, date: req.body.date},
			function(err){
				if(err){
						
						throw err;
						
						}else{
							
							res.send(""+ req.body.locationto+req.body.date);
					
			};
				

	}

};




app.get('/showSnow', function(req, res){
	Snow.find({}, function(err, dataArr){
		if(err){
			throw err;
		}else{
			res.send("<h1>"+dataArr[0].inches+"</h1>"+"<p>"+dataArr+"</p>");
		}
		
	});
});


app.listen(8000);





