const bt=require('bcryptjs');

var  pwd='sahiljulka';
var h;
bt.genSalt(10,(err,salt)=>{
	bt.hash(pwd,salt,(err,hash)=>{
			/*h=hash;console.log(hash);
			bt.compare(pwd,h,(err,res)=>{
			console.log(hash);
		})*/
		console.log(hash);
	})
})

bt.genSalt(10,(err,salt)=>{
	bt.hash(pwd,salt,(err,hash)=>{
			/*h=hash;console.log(hash);
			bt.compare(pwd,h,(err,res)=>{
			console.log(hash);
		})*/
		console.log(hash);
	})
})


bt.compare(pwd,'$2a$10$bJGY58kdawpdkWpqvqEc/ekAZ.eRFTtyoXxz82MVEs5Txm7nfqV1a',(err,res)=>{
	console.log(res);
})

bt.compare(pwd,'$2a$10$KhwzQQfZ4h85eogd5IFqFO6fOBZ6SIGqwgZ0vrxQ9JnOBfntrm5Aq',(err,res)=>{
	console.log(res);
})

