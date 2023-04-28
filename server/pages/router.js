const express =require('express')

const router= express.Router()

const ganres=require('../Genres/Genres')

const country= require('../Country/Country')

const User=require('../auth/User')

const Film=require('../Films/Film')

router.get('/',async(req,res) =>{
    const allGanres= await ganres.find()
    const allCountries= await country.find()

    const films = await Film.find()

    const userr= await User.findById(req.params.id)
    res.render("index",
                            {films:films,
                             ganres:allGanres,
                             country:allCountries,
                             user:req.user ? req.user:{}})
    //,loginUser:req.user
    // console.log('user= ',user)
})




router.get('/login',async (req,res) =>{
    const allCountries=await country.find()
    res.render("Login",{user:req.user?req.user:{}})
})


router.get('/register',(req,res) =>{
    res.render("Register")
})

router.get('/profile/:id',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await country.find()
    const user = await User.findById(req.params.id)
    // res.render("Profile",{ganres:allGanres,counrty:allCountries,user:req.user.id})
    
    if(user){
        res.render('Profile',{user:req.user ? req.user:{},ganres:allGanres,loginUser:req.user })
    }else{
        res.redirect('/not-found')
    }
        
})

router.get('/admin/:id', async (req,res) =>{
    const films= await Film.find()
    const allGanres=await ganres.find()
    const user = await User.findById(req.params.id)
    res.render("AdminProfile",{films:films,user:req.user ? req.user:{},ganres:allGanres,loginUser:req.user })
})


router.get('/addfilm',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await country.find()
    res.render("AddFilm",{ganres:allGanres,country:allCountries,user:req.user ? req.user:{}})
})


router.get('/editfilm',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await counrty.find()
    res.render("EditFilm",{ganres:allGanres,country:allCountries})
})



router.get('/not-found',(req,res)=>{
    res.render('not FOUND')
})
module.exports=router