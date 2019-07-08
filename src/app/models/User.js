const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = await bcrypt.hash(this.password, 8)
})

userSchema.methods = {
    compareHash(password) {
        console.log('entrou')
        return bcrypt.compare(password, this.password)
    }
}

userSchema.statics = {
    geraToken({ id }) {
        return jwt.sign(
            { id },
            'NodeJS',
            { expiresIn: 86400 }
        )
    }
}

module.exports = mongoose.model('User', userSchema)