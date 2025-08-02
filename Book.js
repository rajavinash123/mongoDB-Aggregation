const mongoose =require('mongoose');
const Author = require('./Author');
const BookSchema=new mongoose.Schema({
    title:String,
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Author'
    } //reference 

})
module.exports=mongoose.model('Book',BookSchema);