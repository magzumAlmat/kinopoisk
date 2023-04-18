const { modelName } = require('./Genres')
const Genres = require('./Genres')

const getAllGanres=async(req,res)=>{
    const data=await Genres.find()
    res.send({data})
}

module.exports={getAllGanres}