const homeController = require( '../app/http/controllers/homeController')
const authController = require( '../app/http/controllers/authController')
const cartController = require( '../app/http/controllers/customers/cartController')
//ye controllers vale me sara logic likha va hai
function initRoutes(app) {
    app.get('/', homeController().index)

    // (req, res) =>{         //These lines are replaced by homeController().index
    //     res.render('home')
    // }

    
    
    app.get('/login', authController().login)
    
    app.get('/register', authController().register)

    app.get('/cart', cartController().cart)
    app.post('/update-cart' ,cartController().update)
}    
    
module.exports = initRoutes