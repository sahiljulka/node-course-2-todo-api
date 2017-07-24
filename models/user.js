const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const lodash=require('lodash');

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

var User=mongoose.model('User',userSchema);
	
module.exports={User};