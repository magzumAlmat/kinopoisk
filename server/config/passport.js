const passport= require('passport')
const User=require('../auth/User')

const bcrypt=require('bcrypt')
const localStrategy=require('passport-local')
const { serializeUser } = require('passport')
const { deserializeUser } = require('passport')

passport.use(new localStrategy(
    {
        usernameField:'email'
    },
    function(email,password,done){
        
        User.findOne({email}).then(user=>{
            bcrypt.compare(String(password),String(user.password),function(err,result){
                if (err) {
                    return done(err)
                 }
                if (result) {
                    return done(null,user)
                }

        })

        }).catch(e=>{return done(e) })
    }
))

passport.serializeUser(function(user,done){
    console.log('User Serialize ',user)
    done(null,user._id)
})

passport.deserializeUser(function(id, done){
   console.log('id DESerialize ',id)
   User.findById(id).then((user)=>{
    done(null, user)
   }).catch(err => {
    done(err, null)
   })
})