var express=require('express');
var bp=require('body-parser');
var {mongoose}=require('../db/mongoose');
var {Todo}=require('../models/todo');
var {User}=require('../models/user');
/*var {Player}=require('../models/player');
*/const port=process.env.PORT||3000;

var app=express();

app.use(bp.json());

app.post('/postTodo',(req,res)=>{
	var todo=new Todo({
		text:req.body.text
	});
	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.send(e);
	})
})
app.get('/todo/:id',(req,res)=>{
	res.send(req.params);
})
app.get('/todos',(req,res)=>{
	Todo.find().then((todos)=>{
			res.send(JSON.stringify(todos,undefined,2))
			//console.log(JSON.stringify(todos,undefined,2));
		},
		(err)=>{res.send(JSON.stringify(err,undefined,2))
	})
})
/*var id='59708f297ba31912d89c88c0';
User.findById(id).then((docs)=>{
	if(docs==null){
		return console.log("Id not found");
	}
	console.log(docs);
},(e)=>{
	console.log("Invalid Id");
})*/

app.post('/postUser',(req,res)=>{
	var user=new User({
		email:req.body.email
	});
	user.save().then((doc)=>{
		res.send(doc);
	},(err)=>{
		res.send("Not able to save to database");
	})
});

app.get('/todos/:id',(req,res)=>{
	res.send(id);
})

app.post('/addPlayer',(req,res)=>{
	var player=new Player({
		name:req.body.name,
		'runs scored':req.body['runs scored'],
		'wickets taken':req.body['wickets taken']
	});
	res.send(player);
})

app.listen(port,()=>{
	console.log(`Listening to port ${port}`);
})