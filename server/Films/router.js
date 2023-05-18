const express= require('express')
const router= express.Router()
const {upload}=require('./multer')
const {createFilm}=require('./Controller')
const {editFilm}=require('./Controller')
const {deleteFilm}=require('./Controller')
const {isAuth}=require('../auth/middlewares')
const {saveFilm} =require('./Controller')
const {isAdmin}=require('../auth/middlewaresIsAdmin')
router.post('/api/addFilm/',isAdmin,upload.single('image'),createFilm)
router.post('/api/editfilm/',isAdmin,upload.single('image'),editFilm)
router.post('/api/deletefilm/',isAdmin,deleteFilm)

router.post('/api/films/save',isAuth,saveFilm)


module.exports=router

