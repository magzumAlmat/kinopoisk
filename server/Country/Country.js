const mongoose=require('mongoose')

const CountySchema=new mongoose.Schema({
    name:String,
    key:Number,

})
module.exports=mongoose.model('counrty',CountySchema)