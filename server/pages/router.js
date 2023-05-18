const express =require('express')
const app=express()
const router= express.Router()

const ganres=require('../Genres/Genres')

const country= require('../Country/Country')

const User=require('../auth/User')

const Film=require('../Films/Film')

router.get('/',async(req,res) =>{
    const allGanres= await ganres.find()
    const allCountries= await country.find()

    const films = await Film.find().populate('country').populate('ganre')

    const userr= await User.findById(req.params.id)
    
    res.render("index",
                            {films:films,
                             genres:allGanres,
                             country:allCountries,
                             user:req.user ? req.user:{},
                             loginUser:req.user
                                
                            })
    //,loginUser:req.user
    // console.log('user= ',user)
})




router.get('/login',async (req,res) =>{
    const allCountries=await country.find()
    res.render("Login",{user:req.user?req.user:{}})
})


router.get('/register',async(req,res) =>{
    const userr= await User.findById(req.params.id)
    res.render("Register",{user:req.user ? req.user:{}})
})

router.get('/profile/:id',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await country.find()
    const user = await User.findById(req.params.id).populate('toWatch').populate({path:'toWatch',populate:{path:'country'}}).populate({path:'toWatch',populate:{path:'ganre'}})
    // res.render("Profile",{ganres:allGanres,counrty:allCountries,user:req.user.id})
    const films = await Film.find().populate('country').populate('ganre').populate('author')
    
    if(user){
        res.render('Profile',{userr:user,user:req.user ? req.user:{},ganres:allGanres,loginUser:req.user,films:films })
    }else{
        res.redirect('/not-found')
    }
        
})

router.get('/admin/:id', async (req,res) =>{
    const films = await Film.find().populate('country').populate('ganre').populate('author')
    const allGanres=await ganres.find()
    const user = await User.findById(req.params.id)
    res.render("AdminProfile",{films:films,user:req.user ? req.user:{},ganres:allGanres,loginUser:req.user})
})


router.get('/addfilm',async(req,res) =>{
    const allGanres=await ganres.find()
    const allCountries=await country.find()
    res.render("AddFilm",{ganres:allGanres,country:allCountries,user:req.user ? req.user:{}})
})


router.get('/editfilm/:id',async(req,res) =>{
    
    const allGanres=await ganres.find()
    const user = await User.findById(req.params.id)
    const allCountries=await country.find()
    const films= await Film.findById(req.params.id)
    console.log('req.body=  ',req.body)
    res.render("EditFilm",{films:films,ganres:allGanres,country:allCountries,user:req.user ? req.user:{}})
})
// router.post('/api/deletefilm/', filmController.deleteFilm);
router.post('/deletefilm/:id', async(req, res) => {
//     console.log('DELETE APP')
//     const id = req.params.id;
//     Film.findByIdAndDelete(id, (err) => {
//       if (err) {
//         console.log(err);
//         res.send('Error deleting book');
//       } else {
//         res.redirect('/admin/'+req.user.id)
//       }
//     });
//   });
    const user = await User.findById(req.params.id)
    const allCountries=await country.find()
    const films= await Film.findById(req.params.id)
    console.log('req.body=  ',req.body)
    res.render("DeleteFilm",{films:films,country:allCountries,user:req.user ? req.user:{}})
})

router.get('/not-found',(req,res)=>{
    res.render('not FOUND')
})
module.exports=router