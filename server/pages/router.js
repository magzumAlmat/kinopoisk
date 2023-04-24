const express =require('express')

const router= express.Router()

const ganres=require('../Genres/Genres')

const counrty= require('../Country/Country')

const User=require('../auth/User')

router.get('/',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await counrty.find()
    const user = await User.findById(req.params.id)
    res.render("index",{ganres:allGanres,country:allCountries,user:req.user?req.user:{}})
    //,loginUser:req.user
    // console.log('user= ',user)
})




router.get('/login',async (req,res) =>{
    const allCountries=await counrty.find()
    res.render("Login",{user:req.user?req.user:{}})
})


router.get('/register',(req,res) =>{
    res.render("Register")
})

router.get('/profile/:id',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await counrty.find()
    const user = await User.findById(req.params.id)
    // res.render("Profile",{ganres:allGanres,counrty:allCountries,user:req.user.id})
    
    if(user){
        res.render('Profile',{user:req.user ? req.user:{},ganres:allGanres,loginUser:req.user })
    }else{
        res.redirect('/not-found')
    }
        
})

router.get('/admin/:id', async (req,res) =>{
    const allGanres=await ganres.find()
    const user = await User.findById(req.params.id)
    res.render("AdminProfile",{user:req.user ? req.user:{},ganres:allGanres,loginUser:req.user })
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



router.get('/not-found',(req,res)=>{
    res.render('not FOUND')
})
module.exports=router