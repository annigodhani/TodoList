const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const flash = require('connect-flash')
const User = require('./model/User')
const Task = require('./model/Task')
const config = require('./config')
const { isAuthenticated } = require('./middleware/auth')

const app = express()

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

// Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('index.ejs'))

// Set up EJS
app.set('view engine', 'ejs')

// Session and Flash
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false
}))
app.use(flash())

// Passport initialization
app.use(passport.initialize())
app.use(passport.session())

// Passport config
passport.use(new LocalStrategy({
    usernameField: 'username'
},
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username })
            if (!user) return done(null, false, { message: 'No user found' })
            const isMatch = await user.comparePassword(password)
            if (!isMatch) return done(null, false, { message: 'Incorrect password' })
            return done(null, user)
        }
        catch (err) {
            return done(err)
        }
    }))

passport.serializeUser((user, done) => {
    done(null, user.id)
})  
 
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    }
    catch (err) {
        done(err)
    }
})

app.get("/", (req, res) => {
    res.render("index")
})

// Routes

const authRoutes = require('./routes/auth')
const taskRoutes = require('./routes/task')


app.use('/auth', authRoutes)
app.use('/tasks', taskRoutes)

app.listen(1000, () => {
    console.log('Server running on http://localhost:1000')
})