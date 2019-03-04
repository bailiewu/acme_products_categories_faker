// const app = require('./app')
// const db = require('./db')

// db.syncAndSeed()

// const port = process.env.PORT || 3000
// app.listen(port, () => console.log(`listening on port ${port}.`));

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

// app.get('/pages/:id', (req, res, next) => {
//     Promise.all([
//         Page.findByPk(req.params.id, {
//             include: [ Content ]
//         }),
//         Page.findAll()
//     ])
//         .then( ([page, pages]) => res.render('index', { page, pages })) //ejs renderfile syntax, looks for views/index.html file
//         .catch(next)
// })

// app.post('/pages/:id/contents', (req, res, next) => {
//     Content.create({
//         pageId: req.params.id,
//         title: 'foo',
//         body: `bar${Math.random()}`
//     })
//     .then( (content) => res.redirect(`/pages/${req.params.id}`))
//     .catch(next)
// })

// app.delete('/pages/:pageId/contents/:id', (req, res, next) => {
//     Content.destroy({
//         where: {
//             id: req.params.id
//         }
//     })
//     .then(() => res.redirect(`/pages/${req.params.pageId}`))
//     .catch(next)
// })

module.exports = app
