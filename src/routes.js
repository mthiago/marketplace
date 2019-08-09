const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const authMiddleware = require('./app/middlewares/authMiddleware')
const controllers = require('./app/controllers/controllers')
const validators = require('./app//validators')


routes.post('/users', validate(validators.UserValidator), handle(controllers.UserController.store))
routes.post('/sessions', validate(validators.SessionValidator), handle(controllers.SessionController.store))

routes.use(authMiddleware)

routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post('/ads', validate(validators.AdValidator), handle(controllers.AdController.store))
routes.put('/ads/:id', validate(validators.AdValidator), handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

routes.post('/purchases', validate(validators.PurchaseValidator),  handle(controllers.PurchaseController.store))

module.exports = routes