const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const exphbs = require('express-handlebars')
const mailConfig = require('../../config/mail')

const transport = nodemailer.createTransport(mailConfig)
const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

transport.use('compile', hbs({
    viewEngine: exphbs.create({
        partialsDir: path.resolve(__dirname, '..', 'views', 'emails', 'partials')
    }),
    viewPath,
    extName: '.hbs'
}))

module.exports = transport