const lodash=require('lodash');
const express=require('express');
const bp=require('body-parser');
const {mongoose}=require('../db/mongoose');
const {Todo}=require('../models/todo');
const {User}=require('../models/user');
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

app.delete('/deleteTodo/:id',(req,res)=>{console.log(req.params.id);
	Todo.findByIdAndRemove(req.params.id).then((res1)=>{
		if(res1==null)
			res.status("400").send();
		else 
			res.send(res1);
	},(err)=>{
		res.send("sasa");
	})
})

app.patch('/updateTodo/:id',(req,res)=>{
	var id=req.params.id;debugger;
	var body=lodash.pick(req.body,['text','completed']);console.log(body)
	if(lodash.isBoolean(body.completed) && body.completed){
		body.completedAt=new Date().getTime();
	}
	else
	{
		body.completed=false
		body.completedAt=null
	}
	Todo.findByIdAndUpdate(id,{$set:body},{new:true})
	.then((todo)=>{
		if(!todo){
			return res.status(400).send();
		}
		res.send({todo})
	},(err)=>{
		res.send(err);
	})
})

/*User.remove({}).then((result)=>{
	console.log(result);
})*/

app.listen(port,()=>{
	console.log(`Listening to port ${port}`);
})