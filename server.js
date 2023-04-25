const { request } = require('express');
const express=require('express')
const session=require('express-session')
const mongooseStore=require('connect-mongo')
const passport=require('passport')

const logger = require('morgan')
const app=express();


require('./server/config/db')
require('./server/config/passport')

app.use(logger('dev'))              //Логер для вывода  в терминал
app.use(express.static(__dirname+'/public'))       // ищет статические файлы
app.use(express.json());
app.use(express.urlencoded({                                      //создается req.body и туда заливаются данные с формы через метод post 
  extended: true
}));
app.use(session({
  name:'kinopoisk.session',
  secret:'keyboard cat',
  maxAge: 1000*60*60*7,
  resave:false,
  store:mongooseStore.create({
    mongoUrl:'mongodb://127.0.0.1:27017'
  })

}))

app.set("view engine","ejs")

app.use(passport.initialize())
app.use(passport.session())


app.use(require('./server/pages/router'))

app.use(require('./server/auth/router'))

app.use(require('./server/Genres/router'))

app.use(require('./server/Country/router'))

app.use(require('./server/Films/router'))

const PORT=8000


app.listen(PORT, () =>{
    console.log(`This is port11 ${PORT}`);
})