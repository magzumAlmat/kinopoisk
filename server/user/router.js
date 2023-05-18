const express=require('express')
const router= express.Router()
const {saveToWatch} = require('./controller')
// const Genres=require('./Genres')

router.post('/api/saveToWatch/',saveToWatch)

writeDataGenre()
module.exports=router