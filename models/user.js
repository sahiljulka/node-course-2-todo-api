const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const lodash=require('lodash');
const bt=require('bcryptjs');

var userSchema=new mongoose.Schema({
	email:{
		type:String,
		required:true,
		minLength:1,
		trim:true,
		unique:true,
		validate:{
			validator:validator.isEmail,
			message:`{VALUE} is not valid Email`
		}
	},
	password:{
		type:String,
		required:true,
		minLength:6
	},
	tokens:[{
		access:{
			type:String,
			required:true
		},
		token:{
			type:String,
			required:true
		}
	}]
})

userSchema.pre('save',function(next){
	var user=this;

	if(user.isModified('password')){
		bt.genSalt(10,(err,salt)=>{
			bt.hash(user.password,salt,(err,hash)=>{
			user.password=hash;
			next();
			})
		})
	}
	else
		next();
});

userSchema.methods.toJSON=function(){
	debugger;
	var user=this;
	var userObj=user.toObject();
	
	return lodash.pick(userObj,['_id','email']);
}

userSchema.methods.generateAuthToken=function(){
	var user=this;
	var access='auth';
	var token=jwt.sign({_id:user._id.toHexString(),access},'abc123').toString();
	user.tokens.push({access,token});

	return user.save().then(()=>{
		return token; 
	});/*,(e)=>{
		console.log(e);
	})*/
}

userSchema.statics.findByToken=function(token){
	var User=this;
	var decoded=undefined;
	try{
		decoded=jwt.verify(token,'abc123');
	}
	catch(e){
		return new Promise((resolve,reject)=>{
			reject();
		})
		//OR
		//Promise.reject();
	}

	return User.findOne({
		'_id':decoded._id,
		'tokens.token':token,
		'tokens.access':'auth'
	})
}

var User=mongoose.model('User',userSchema);
	
module.exports={User};