const express =require('express')
const app=express()
const router= express.Router()

const ganres=require('../Genres/Genres')

const country= require('../Country/Country')

const User=require('../auth/User')

const Film=require('../Films/Film')

const Rate=require('../Rates/Rates')
router.get('/',async(req,res) =>{

    console.log('OuTPUT',req.query)
    const Ganres= await ganres.findOne({key:req.query.Ganres})
    // console.log(Ganres._id)
    // console.log(Ganres)
    const options={}
    
    if(Ganres)
    {
        options.genre=Ganres._id        //ganre потому что название таблицы такое
        res.locals.Ganres = req.query.Ganres
    }
    
    let page=0
    const limit=3

    if(req.query.page && req.query.page>0){
        page=req.query.page  
    }

    if(req.query.search && req.query.search.length > 0){
        options.$or = [
            {
                titleRus: new RegExp(req.query.search, 'i')
            },
            {
                titleEng: new RegExp(req.query.search, 'i')
            }
        ]
        res.locals.search = req.query.search
    }

    // if (req.query.Categories){
    //     options.category = Categories._id;
    // }
    

    const totalFilms= await Film.count(options)


    const genre= await ganres.find()
    const allCountries= await country.find()

    const films = await Film.find(options).limit(limit).skip(page*limit).populate('country').populate('genre')

    const userr= await User.findById(req.params.id)
    
    res.render("index",
                            {films:films,
                             genre,
                             country:allCountries,
                             user:req.user ? req.user:{},
                             loginUser:req.user,
                             pages:Math.ceil(totalFilms/limit)
                                
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
    const films = await Film.find().populate('country').populate('genre').populate('author')
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

// router.get('/detail/:id',async (req,res)=>{
//     const allGanres= await ganres.find()
//     const allCountries= await country.find()

//     const films = await Film.find().populate('country').populate('ganre')

//     const userr= await User.findById(req.params.id)
    
//     res.render("detail",
//                             {film:films,
//                              genres:allGanres,
//                              country:allCountries,
//                              user:req.user ? req.user:{},
//                              loginUser:req.user
                                
//                             })
// })


router.get('/detail/:id', async(req, res) =>{
    
   
    const rates=await Rate.find({filmId:req.params.id}).populate('authorId')
    let averageRate = 0;
    for(let i = 0; i < rates.length; i++){
        averageRate += rates[i].rate
    }
    const film = await Film.findById(req.params.id).populate('country').populate('genre')
    res.render("detail", {user: req.user ? req.user: {}, film: film,rates:rates,averageRate: (averageRate / rates.length).toFixed(1)})
})


// router.get('/addSerial',async())

module.exports=router