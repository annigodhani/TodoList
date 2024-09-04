const User = require('../model/User')
const passport = require('passport')

// Render the registration page
exports.getRegister = (req, res) => {
    res.render('register')
}

// Handle user registration
exports.postRegister = async (req, res) => {
    const { username, password } = req.body
    try {
        const newUser = await User.create({ username, password })
        await newUser.save()
        res.redirect('/auth/login')
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Server Error')
    }
}

// Render the login page
exports.getLogin = (req, res) => {
    res.render('login', { error: req.flash('error') })
}

// Handle user login
exports.postLogin = passport.authenticate('local', {
    successRedirect: '/tasks',
    failureRedirect: '/auth/register',
    failureFlash: true
})

// Handle user logout
exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err)
        }
        res.redirect('/auth/login')
    })
}