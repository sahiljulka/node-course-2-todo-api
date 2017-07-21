var mongoose=require('mongoose');

mongoose.Promise=global.Promise;
//mongoose.connect(' mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://<sahil>:<1234567>@ds043200.mlab.com:43200/todoapp');

module.exports={mongoose};