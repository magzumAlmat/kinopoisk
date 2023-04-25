const express= require('express')
const router= express.Router()
const {upload}=require('./multer')
const {createFilm}=require('./Controller')
const {isAuth}=require('../auth/middlewares')
router.post('/api/addFilm/',isAuth,upload.single('image'),createFilm)


module.exports=router

