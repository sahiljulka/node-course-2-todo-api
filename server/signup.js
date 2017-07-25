const {User}=require('../models/user');
const lodash=require('lodash');
const {authenticate}=require('./middleware/authenticate');

module.exports=(function(){
	function addUser(req,res){
		var user=new User(lodash.pick(req.body,['email','password']));
		console.log(JSON.stringify(user,undefined,2));
		user.save().then((user)=>{
			return user.generateAuthToken();
		})
		.then((token)=>{
			res.header(`x-auth`,token).send(user);
		})
		.catch((e)=>{
			console.log(e);
		})
	}

	function meUser(req,res){
			res.send(req.user);
	}

	function init(appConfig){
		appConfig.post('/addUser',addUser);
		appConfig.get('/users/me',authenticate,meUser);
	}

	return {
		init:init
	}

})();