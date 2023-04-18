const express=require('express')
const router= express.Router()
// const Genres=require('./Genres')

const {getAllGanres} = require('./controller')

const writeDataGenre=require('./Seed')


router.get('/api/genre',getAllGanres)

writeDataGenre()
module.exports=router