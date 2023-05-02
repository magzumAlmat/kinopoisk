const express= require('express')
const router= express.Router()
const {upload}=require('./multer')
const {createFilm}=require('./Controller')
const {editFilm}=require('./Controller')
const {deleteFilm}=require('./Controller')
const {isAuth}=require('../auth/middlewares')

router.post('/api/addFilm/',isAuth,upload.single('image'),createFilm)
router.post('/api/editfilm/',isAuth,upload.single('image'),editFilm)
router.post('/api/deletefilm/',isAuth,deleteFilm)



module.exports=router

