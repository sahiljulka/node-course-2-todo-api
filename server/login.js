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
		.then((token)=>{debugger;
			res.header(`x-auth`,token).send(user);
		})
		.catch((e)=>{
			console.log(e);
		})
	}

/*	var authenticate=(req,res,next)=>{
		var token=req.header('x-auth');
		User.findByToken(token).then((user)=>{
			if(!user){
				return Promise.reject(); 
			}
			req.user=user;
			req.token=token;
			next();
		},(e)=>{
			res.status(401).send();
		})
	}*/

	function meUser(req,res){
		/*var token=req.header('x-auth');
		User.findByToken(token).then((user)=>{
			if(!user){
				return Promise.reject(); 
			}*/
			res.send(req.user);
		/*},(e)=>{
			res.status(401).send();
		})*/
	}



	function init(appConfig){
		appConfig.post('/addUser',addUser);
		appConfig.get('/users/me',authenticate,meUser);
	}

	return {
		init:init
	}

})();