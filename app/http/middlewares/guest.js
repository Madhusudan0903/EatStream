// middleware so that agar logged in hoto vo register aur login page pe na ja paye
function guest (req, res, next) {
    if(!req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}

module.exports = guest