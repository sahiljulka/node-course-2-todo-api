const lodash=require('lodash');
const {User}=require('../models/user');
module.exports=(function(){

function login(req,res){debugger;
	var body=lodash.pick(req.body,['email','password']);
	User.findByCredentials(body).then((user)=>{
		return user.generateAuthToken();
	})
	.then((token)=>{
		res.header(`x-auth`,token).send(user);
	})
	.catch((e)=>{
		res.status(400).send();
	});
}

var init=(appConfig)=>{
	appConfig.post('/login',login);
}
return {init}
})();