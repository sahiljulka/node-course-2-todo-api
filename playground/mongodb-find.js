const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
	if(err){
	return console.log("Error in connecting to database");
	}
	console.log("connected to mongodb server");

	/*db.collection('Users').find({_id:new ObjectID('596e51804dd6ea071860c394')}).toArray().then((docs)=>{
		console.log('Users');
		console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log("error in fetching data from database"+err)
	});*/
	/*db.collection('Users').insertOne({
		name:'sam sharma',
		age:21,
		location:'gurugram',
		_id:123
	},(err,res)=>{

	});*/
	db.collection('Users').find({_id:123}).toArray().then((docs)=>{
		console.log('Users');
		console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log("error in fetching data from database"+err)
	});

	let a=db.collection('Users').find().count(true,{skip:2,limit:5},(err,count)=>{
		console.log(count);
	})
})
