// Middleware to check if the user is authenticated
module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next() // If user is authenticated, proceed to the next middleware or route
    }
    req.flash('error', 'You need to log in to access this page')
    res.redirect('/auth/login') // Redirect to login page if not authenticated
}