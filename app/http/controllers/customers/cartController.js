function cartController() {
    return {
        cart(req, res) {
            res.render('customers/cart')
        },
        update(req, res) {
            //example structure of cart
            // let cart = {
            //     items: {
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //         pizzaId: { item: pizzaObject, qty:0 },
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            // for the first time creating cart and adding basic object structure
            if (!req.session.cart) { //agar session me cart nhi hai
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            // Check if item does not exist in cart 
            if(!cart.items[req.body._id]) { //req.body by default json hogi to usko enable krna pdega by app.use(express.json()) in server.js
                cart.items[req.body._id] = {
                    item: req.body,   //this req.body is an object , i.e the particular pizza we add
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice =  cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty }) //ye btayega ki total kitne pizza addkrdiye cart me top right corner me dikhega
        }
    }
}            
module.exports = cartController