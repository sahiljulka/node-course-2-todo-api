var mongoose=require('mongoose');

var Player=mongoose.model('Players',{
	name:{
		type:String,
		required:true
	},
	'runs scored':{
		type:Number,
		required:true
	},
	'wickets taken':{
		type:Number,
		required:true
	}
});

module.exports={Player}