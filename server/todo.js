const {Todo}=require('../models/todo');
const {authenticate}=require('./middleware/authenticate');
const lodash=require('lodash');

module.exports=(function(){


	function getTodos(req,res){
			Todo.find({
				_owner:req.user._id
			}).then((todos)=>{
			res.send(JSON.stringify(todos,undefined,2))
			//console.log(JSON.stringify(todos,undefined,2));
			},(err)=>{res.send(JSON.stringify(err,undefined,2))
		})
	}

	function postTodo(req,res){
		var todo=new Todo({
			text:req.body.text,
			_owner:req.user._id
		});
		todo.save().then((doc)=>{
			res.send(doc);
		},(e)=>{
			res.send(e);
		})
	}
	
	function getTodoById(req,res){debugger;
		Todo.find({_id:req.params.id,_owner:req.user._id})
		.then((docs)=>{
			if(docs.length==0)
				return res.status(400).send();
			res.send(JSON.stringify(docs,undefined,2));
		})
		.catch((e)=>{
			res.status(400).send();
		})
	}

	function deleteTodo(req,res){
		Todo.remove({_id:req.params.id,_owner:req.user._id})
		.then((docs)=>{
			if(docs.length==0){
				return res.status(400).send();
			res.send(JSON.stringify(docs,undefined,2));
			}
		})
		.catch((e)=>{
			res.status(400).send();
		})
	}

	function updateTodo(req,res){debugger;
		var id=req.params.id;
		var body=lodash.pick(req.body,['text','completed']);

		if(lodash.isBoolean && body.completed==true){
			body.completedAt=new Date().getTime();
		}
		else
		{
			body.completed=false;
			body.completedAt=null;
		}
		Todo.findOneAndUpdate({_id:id,_owner:req.user._id},
							  {$set:body},{new:true})
							  .then((docs)=>{console.log(docs);
							  	if(!docs){
									return res.status(400).send();
								}
								res.send(docs)
							  })
							  .catch((e)=>{
							  	res.status(400).send();
							  })

	}

	function init(appConfig){
		appConfig.get('/todos',authenticate,getTodos);
		appConfig.post('/postTodo',authenticate,postTodo);
		appConfig.get('/todos/:id',authenticate,getTodoById);	
		appConfig.delete('/deleteTodo/:id',authenticate,deleteTodo);
		appConfig.patch('/updateTodo/:id',authenticate,updateTodo);	
	}

	return {
		init:init
	}

})();