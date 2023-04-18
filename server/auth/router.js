const express=require('express')
const router= express.Router()
// const Genres=require('./Genres')
// const writeDataCountry=require('./Seed')
// const {getAllCounties} = require('./Controller')
const {signUp}=require('./Controller')
router.post("/api/signup",signUp)

module.exports=router