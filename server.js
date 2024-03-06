require('dotenv').config() //secret keys ko .env se laane ke liye
const express = require('express') //ye ek function import hojata hai
const app = express() //ye object bnalia uss function ka
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env. PORT || 3000 //environment variable me check krega ki koi port pda hai kya,  nhi to 3000 
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo'); //session ko store krne ke liye, connect-mongo ek package install kia tha
const passport = require('passport')
const Emitter = require('events')

// Database connection
const url = 'mongodb://127.0.0.1:27017/pizza';
mongoose. connect (url , {
  useNewUrlParser : true, useUnifiedTopology : true
},).then(() => console. log( 'Connected Successfully' ) )
  . catch( (err) => { console.error(err); });

  
// Event emitter
const eventEmitter = new Emitter()
app.set('eventEmitter', eventEmitter)


// Session config
  app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
      mongoUrl: 'mongodb://127.0.0.1:27017/pizza', //session ko iss database me store krna hai
      collection:'sessions'
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }// cookie session valid for 24 hours
  }))


// Passport config
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())
// Assets
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: false})) //jab form submit kroge register vala tb urlencoded data receive hoega


// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session
  res.locals.user = req.user
  next()
})


// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views')) 
app.set('view engine', 'ejs')


//ye routes ko hmesha Template engine ke baad rkhna hai
require('./routes/web')(app) //ye ek function call krdia yahan
// app.get('/', (req, res) => {
//     res.render('home')
// })



const server = app.listen (PORT,  ()  =>  {
    console.log(`Listening on port ${PORT}`)
})

// Socket

const io = require('socket.io')(server)
io.on('connection', (socket) => {
      // Join
      socket.on('join', (orderId) => {
        socket.join(orderId)
      })
})

eventEmitter.on('orderUpdated', (data) => {
    io.to(`order_${data.id}`).emit('orderUpdated', data)
})

eventEmitter.on('orderPlaced', (data) => {
    io.to('adminRoom').emit('orderPlaced', data)
})