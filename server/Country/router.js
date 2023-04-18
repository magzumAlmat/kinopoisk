const express=require('express')
const router= express.Router()
// const Genres=require('./Genres')
const writeDataCountry=require('./Seed')
const {getAllCounties} = require('./Controller')




router.get('/api/country',getAllCounties)
writeDataCountry()

module.exports=router