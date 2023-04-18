const { modelName } = require('./Country')
const Country = require('./Country')

const getAllCounties=async(req,res)=>{
   
    const data=await Country.find()
    res.send({data})
}

module.exports={getAllCounties}