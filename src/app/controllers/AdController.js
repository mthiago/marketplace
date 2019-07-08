const Ad = require('../models/Ad')
const adConfig = require('../../config/adConfig')

class AdController {

    async index (req, res) {

        //Inicializa variável vazia
        const filters = {}

        //Verifica se existe filtros min e max
        if (req.query.price_min || req.query.price_max) {

            //Caso exista, inicializa variável vazia
            filters.price = {}

            //Se existir min, seta no filtro min do mongoose
            if (req.query.price_min) {
                filters.price.$gte = req.query.price_min
            }

            //Se existir max, seta no filtro max do mongoose
            if (req.query.price_max) {
                filters.price.$lte = req.query.price_max
            }
        }

        //Verifica se existe title
        if (req.query.title) {
            //Se existir, seta com regex para ignorar maiusc. e minusc.
            filters.title = new RegExp(req.query.title, 'i')
        }

        const ads = await Ad.paginate(filters, {
            page: req.query.page || 1,
            limit: adConfig.limitPerPage,
            populate: ['author'],
            sort: '-createdAt'
        })
        return res.json(ads)
    }

    async show (req, res) {
        const ad = await Ad.findById(req.params.id)
        return res.json(ad)
    }

    async store (req, res) {
        const ad = await Ad.create({ ...req.body, author: req.userId })
        return res.json(ad)
    }

    async update (req, res) {
        const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        return res.json(ad)
    }

    async destroy (req, res) {
        await Ad.deleteOne(req.body.id)
        return res.json()
    }

}

module.exports = new AdController()