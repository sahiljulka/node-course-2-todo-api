var mongoose=require('mongoose');
var Todo=mongoose.model('Todo',{
	text:{
		type:String,
		required:true
	},
	completed:{
		type:Boolean,
		default:false
		//required:true
	},
	completedAt:{
		type:Number,
		default:null
	},
	_owner:{
		type:mongoose.Schema.Types.ObjectId,
		required:true,
	}
});
module.exports={Todo};