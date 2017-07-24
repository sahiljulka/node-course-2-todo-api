const {User}=require('../models/user');
const lodash=require('lodash');

module.exports=(function(){
	function addUser(req,res){
		var user=new User(lodash.pick(req.body,['email','password']));
		console.log(JSON.stringify(user,undefined,2));
		user.save().then((user)=>{
			return user.generateAuthToken();
		})
		.then((token)=>{debugger;
			res.header(`x-auth`,token).send(user);
		})
		.catch((e)=>{
			console.log(e);
		})
	}


	function init(appConfig){
		appConfig.post('/addUser',addUser);
	}

	return {
		init:init
	}

})();