var env=process.env.NODE_ENV || 'development';

if(env=='development' || env=='test'){
	var config=require('./config.json');
	var envConfig=config.development;
	
	Object.keys(envConfig).forEach((key)=>{console.log(key);
		process.env[key]=envConfig[key];
	});console.log(process.env);
}

/*if(env=='development'){
	process.env.PORT=3000;
	process.env.MONGODB_URI='mongodb://localhost:27017/TodoApp';
}
else if(env=='test'){
	process.env.PORT=3000;
}*/
else if(env=='production'){
	process.env.MONGODB_URI='mongodb://sahil:1234567@ds043200.mlab.com:43200/todoapp';
}