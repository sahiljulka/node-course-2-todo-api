const jwt=require('jsonwebtoken');

var data={
	id:10
}

var token=jwt.sign(data,'123abc');

console.log(jwt.verify(token,'123abc'));
console.log(token);