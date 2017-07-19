const {MongoClient,ObjectID}=require('mongodb');

var obj=new ObjectID();
console.log(obj);
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
	if(err){
	return console.log("Error in connecting to database");
	}
	console.log("connected to mongodb server");

	/*db.collection('Todos').insertOne({
		name:'sahil julka',
		designation:'trainee'
	},(err,res)=>{
		if(err){
		return console.log("Unable to insert into Database");
		}
		console.log(res.ops);
	});*/

	db.collection('Users').insertOne({
		name:'sahil julka',
		age:21,
		location:'firozpur'
	},(err,res)=>{
		if(err){
		return console.log("Unable to insert into Database");
		}
		console.log(res.ops[0]._id.getTimestamp());
	})

	db.close();
})