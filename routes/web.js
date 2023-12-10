const homeController = require( '../app/http/controllers/homeController')
const authController = require( '../app/http/controllers/authController')
const cartController = require( '../app/http/controllers/customers/cartController')
const guest = require('../app/http/middlewares/guest')
//ye controllers vale me sara logic likha va hai
function initRoutes(app) {
    app.get('/', homeController().index)

    // (req, res) =>{         //These lines are replaced by homeController().index
    //     res.render('home')
    // }

    
    
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    
    app.get('/register', guest, authController().register)
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().cart)
    app.post('/update-cart' ,cartController().update)
}    
    
module.exports = initRoutes