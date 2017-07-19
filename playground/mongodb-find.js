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
		sex:'male'
	},(err,res)=>{
		console.log(err);
		console.log(res.ops);
	});*/
	/*db.collection('Users').find({}).toArray().then((docs)=>{
		console.log('Users');
		console.log(JSON.stringify(docs,undefined,2));
	},(err)=>{
		console.log("error in fetching data from database"+err)
	});

	db.collection('Users').find().count(true,{skip:2,limit:5},(err,count)=>{
		console.log(count);
	})*/
	db.collection('Users').findOneAndDelete({'name':'sahil julka'}).then((res=>{
		console.log(res);
	}))
})
