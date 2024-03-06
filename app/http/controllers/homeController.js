const Menu = require('../../models/menu')
function homeController() {   //ye ek factory function hai jo return krta hia ek object
    return {
        async index(req, res){ //bcoz mai home page ko sirf read(i.e only get method) krna chahta tha so mai uske liye ek method bnaunga index
            const pizzas = await Menu.find()
            return res.render('home', { pizzas: pizzas }) //ab frontend pe apne ko ye left side vala pizzas varible access hojayega jisme saare data aajayenge from pizzas in right(aur ye ek array of objects hoega jitne bhi menu items hai unka)
        }
    }        
}            
module.exports = homeController