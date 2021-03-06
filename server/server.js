require('./config/config.js');

const lodash=require('lodash');
const express=require('express');
const bp=require('body-parser');
const {mongoose}=require('../db/mongoose');
const {Todo}=require('../models/todo');
const {User}=require('../models/user');
const signup=require('./signup.js');
const login=require('./login.js');
const todo=require('./todo.js');
//const port=process.env.PORT||3000;




var app=express();

app.use(bp.json());
signup.init(app);
login.init(app);
todo.init(app);
console.log(process.env.PORT);
app.listen(process.env.PORT,()=>{
	console.log(`Listening to port`);
})
module.exports={app};