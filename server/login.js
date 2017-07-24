const lodash=require('lodash');
const {User}=require('../models/user');
const {authenticate}=require('./middleware/authenticate');

module.exports=(function(){

function login(req,res){debugger;console.log(req.body);
	var body=lodash.pick(req.body,['email','password']);
	User.findByCredentials(body).then((user)=>{
		return user.generateAuthToken();
	})
	.then((token)=>{debugger;
		res.header(`x-auth`,token).send(user); 
	})
	.catch((e)=>{console.log("asdsad");
		res.status(400).send();
	});
}

function logout(req,res){
	var token=req.token;
	req.user.removeToken(token)
	.then((user)=>{
		res.status(200).send();
	})
	.catch((e)=>{
		res.status(400).send();
	});
}

var init=(appConfig)=>{
	appConfig.post('/login',login);
	appConfig.delete('/logout',authenticate,logout);
}
return {init}
})();