const mongoose=require('mongoose')

const GenreSchema=new mongoose.Schema({
    name:String,
    key:Number,
})


module.exports = mongoose.model('ganre',GenreSchema)