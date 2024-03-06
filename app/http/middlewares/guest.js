// middleware so that agar logged in hoto vo register aur login page pe na ja paye
function guest (req, res, next) {
    if(!req.isAuthenticated()) { //ye isAuthenticated() passport ki help se milta h apne ko jo btata h ki user logged in nhi h
        return next()
    }
    return res.redirect('/')
}

module.exports = guest