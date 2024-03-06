const homeController = require( '../app/http/controllers/homeController')
const authController = require( '../app/http/controllers/authController')
const cartController = require( '../app/http/controllers/customers/cartController')
const orderController = require( '../app/http/controllers/customers/orderController')

const adminOrderController = require( '../app/http/controllers/admin/orderController')
const statusController = require( '../app/http/controllers/admin/statusController')

// Middlewares 
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

//ye controllers vale me sara logic likha va hai
function initRoutes(app) {
    app.get('/', homeController().index) //.index krke call krlia i.e object ke upar method call krlia

    // (req, res) =>{         //These lines are replaced by homeController().index
    //     res.render('home')
    // }

    
    
    app.get('/login', guest, authController().login)
    app.post('/login', authController().postLogin)
    
    app.get('/register', guest, authController().register) //register page dikhane ke liye
    app.post('/register', authController().postRegister) //aur ye usme data update krne k liye
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().cart)

    //ye to cart me koi item add krre hai uske liye hai
    app.post('/update-cart' ,cartController().update)

    

    // Customer routes
    app.post('/orders', auth, orderController().store)
    app.get('/customer/orders', auth, orderController().index)
    app.get('/customer/orders/:id', auth, orderController().show)

    // Admin routes
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)
}    
    
module.exports = initRoutes