const express = require('express')
const database = require('./config/database')
const mongoose = require('mongoose')
const validate = require('express-validation')
const Youch = require('youch')
const Sentry = require('@sentry/node')
const sentryConfig = require('./config/sentryConfig')

class App {

    constructor() {
        this.express = express();
        this.sentry()
        this.database()
        this.middlewares()
        this.routes()
        this.exception()
    }

    sentry () {
        Sentry.init(sentryConfig)
    }

    database() {
        mongoose.connect(database.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middlewares() {
        this.express.use(express.json())
        this.express.use(Sentry.Handlers.requestHandler());
    }

    routes() {
        this.express.use(require('./routes'))
    }

    exception() {
    this.express.use(Sentry.Handlers.errorHandler());

        this.express.use(async (err, req, res, next) => {
            if (err instanceof validate.ValidationError) {
                return res.status(err.status).json(err)
            }

            const youch = new Youch(err)
            return res.json(await youch.toJSON())


            return res.status(err.status || 500).json({ error: 'Internal Server Error' })
        })
    }

}

module.exports = new App().express