const {Todo}=require('../models/todo');
module.exports=(function(){


	function getTodos(req,res){
			Todo.find().then((todos)=>{
			res.send(JSON.stringify(todos,undefined,2))
			//console.log(JSON.stringify(todos,undefined,2));
			},(err)=>{res.send(JSON.stringify(err,undefined,2))
		})
	}

	
		
	function init(appConfig){
		appConfig.post('/todos',getTodos);
	}

	return {
		init:init
	}

})();