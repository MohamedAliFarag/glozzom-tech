const PORT = process.env.PORT || 3100
//install Packages
const express    = require('express')
const bodyParser = require('body-parser')
const path       = require('path')
const mongoose   = require('mongoose')
const flash      = require('connect-flash')
const session    = require('express-session')
const dotenv     = require('dotenv').config()

//Database
mongoose.connect(process.env.DATABASEURL,{ useNewUrlParser: true , useUnifiedTopology: true})

//config packages
const app = express()
//ejs
app.set('view engine','ejs')
//static file public
app.use(express.static(path.join(__dirname,'public')))
//bodyParser
app.use(bodyParser.urlencoded({extended:false}))
//connect-flash
app.use(flash())
//express-session
app.use(session({
    secret:'Hello monkys',
    resave: false,
    saveUninitialized: false
  }))
  

//middlewares
app.use((req,res,next)=>{
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
  })


//Routes
const homeRoutes = require('./routes/glozzom')
//use Routes
app.use(homeRoutes)

//404 : No page
app.use((req,res,next)=>{
  return res.status(404).render('index/404',{pageTitle:'Nothing Here'})
})


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('DB Connected')
});
app.listen(PORT)