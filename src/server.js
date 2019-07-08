const express = require('express')
const database = require('./config/database')
const mongoose = require('mongoose')

class App {

    constructor() {
        this.express = express();
        this.database()
        this.middlewares()
        this.routes()
    }

    database() {
        mongoose.connect(database.uri, {
            useCreateIndex: true,
            useNewUrlParser: true
        })
    }

    middlewares() {
        this.express.use(express.json())
    }

    routes() {
        this.express.use(require('./routes'))
    }

}

module.exports = new App().express