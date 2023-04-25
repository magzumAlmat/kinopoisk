const mongoose=require('mongoose')
const Schema=mongoose.Schema
const FilmSchema=new mongoose.Schema({
    titleRus:String,
    titleEng:String,
    year:Number,
    time:String,
    key:Number,
    country:{type:Schema.Types.ObjectId,ref: "country"},
    ganre:{type:Schema.Types.ObjectId,ref: "genre"},
    image:String,
})


module.exports = mongoose.model('film',FilmSchema)