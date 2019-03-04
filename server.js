const express = require('express')
const morgan = require('morgan')
const { models } = require('./models')
const path = require('path')


const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.static('public'))

app.get('/', (req, res, next) => {
    res.sendFile((path.join(__dirname, 'index.html')))
})

app.get('/api/categories', (req, res, next) => {
    models.Category.findAll()
        .then( (category) => {
            res.send(category)
        })
        .catch(next)
})

app.get('/api/products', (req, res, next) => {
    models.Product.findAll()
        .then( (product) => {
            res.send(product)
        })
        .catch(next)
})

app.post('/api/categories', (req, res, next) => {
    models.Category.newCategory()
    .then( (category) => {
        res.send(category)
    })
    .catch(next)
})

app.delete('/api/categories/:id', (req, res, next) => {
    models.Category.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(204))
    .catch(next)
})

app.post('/api/products/:id', (req, res, next) => {
    models.Product.newProduct(req.params.id)
    .then( (product) => {
        res.send(product)
    })
    .catch(next)
})

app.delete('/api/products/:id', (req, res, next) => {
    models.Product.destroy({
        where: {
            id: req.params.id
        }
    })
    .then( () => res.sendStatus(204))
    .catch(next)
})

module.exports = app
