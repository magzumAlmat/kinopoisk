const express =require('express')

const router= express.Router()

const ganres=require('../Genres/Genres')

const counrty= require('../Country/Country')

router.get('/',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await counrty.find()
    res.render("index",{ganres:allGanres,counrty:allCountries})
})




router.get('/login',(req,res) =>{
    res.render("Login")
})


router.get('/register',(req,res) =>{
    res.render("Register")
})

router.get('/profile/:id',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await counrty.find()
    
    res.render("Profile",{ganres:allGanres,counrty:allCountries})
})

router.get('/admin',(req,res) =>{
    res.render("AdminProfile")
})


router.get('/addfilm',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await counrty.find()
    res.render("AddFilm",{ganres:allGanres,counrty:allCountries})
})


router.get('/editfilm',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await counrty.find()
    res.render("EditFilm",{ganres:allGanres,counrty:allCountries})
})
module.exports=router