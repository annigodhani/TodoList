const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    const hashedPassword = await bcrypt.hash(this.password, 12)
    this.password = hashedPassword
    next()
})

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)