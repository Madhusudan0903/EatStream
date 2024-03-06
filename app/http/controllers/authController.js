//login, register vala sara logic iss controller me

const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.size === 'admin' ? '/admin/orders' : '/customer/orders'
    }

    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => { //ye info me messages receive hore hai jaise ki logged in successfully
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next) //passport.authenticate return krta h ek function jo hmne yahan call kia h
        },
        register(req, res) {
            res.render('auth/register')
        },
        async postRegister(req, res) {
            const {name, email, password} = req.body 
            // Validate request 
            if(!name || !email || !password) {
                req.flash('error', 'All fields are required') //ye message display hoga register.ejs m
                req.flash('name', name) //ye isliye likha taki refresh krne pe data erase na ho aur ye register.ejs me value attribute me dikenge
                req.flash('email', email)
            return res.redirect('/register')
        }
        // Check if email exists 
            const findUser = await User.findOne({email})
            if(findUser){
                req.flash("error", "Already Registred with this email..!!")
                return res.redirect("/register")
            }
            // Hash password 
            const hashedPassword = await bcrypt.hash(password, 10) //hashed me store krna h password using bcrypt
            // Create a user 
            const user = new User({
             name,
             email,
             password: hashedPassword
            })
            user.save().then((user) => {
                // Login
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                    return res.redirect('/register')
            })
            //console.log(req.body)
        },
        logout(req, res){
            req.logout(function(err){
                if (err) throw err;
            })
            return res.redirect('/login')
        }
    }
}            
module.exports = authController