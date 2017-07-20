var express=require('express');
var bp=require('body-parser');
var {mongoose}=require('../db/mongoose');
var {Todo}=require('../models/todo');
var {User}=require('../models/user');

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

app.listen(3000,()=>{
	console.log("Listening to port 3000");
})