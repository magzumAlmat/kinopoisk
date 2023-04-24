const express = require('express')
const router = express.Router()
const passport = require('passport')
const createAdmin =require('../Admin/seed')
// const Genres=require('./Genres')
// const writeDataCountry=require('./Seed')
// const {getAllCounties} = require('./Controller')

const {signUp,signIn,signOut}=require('./Controller')


router.post("/api/signup/",signUp)
router.post("/api/signin/",passport.authenticate('local',{failureRedirect:'/login?error=1'}),signIn)
router.get( "/api/signout/", signOut)
createAdmin()
module.exports = router