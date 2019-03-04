const Sequelize = require('sequelize')
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_products_categories_faker', {
    logging: false
})

const faker = require('faker')

const Category = conn.define('category', {
    name: Sequelize.TEXT,
})
const Product = conn.define('product', {
    name: Sequelize.TEXT,
})

Category.newCategory = function (){
    return this.create({
        name: faker.commerce.department()
    })
}

Product.newProduct = function (id){
    return this.create({
        name: [faker.commerce.productAdjective(), faker.commerce.productMaterial(), faker.commerce.product()].join(' '),
        categoryId: id
    })
}

Category.hasMany(Product, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'})
Product.belongsTo(Category)
// Product.belongsTo(Category, {foreignKey: { allowNull: false}})


const syncAndSeed = () => {
    return conn.sync( {force: true})
        .then( async () => {
            const [foo, cat1, cat2] = await Promise.all([
                Category.create({
                    name: 'Foo Category'
                }),
                Category.newCategory(),
                Category.newCategory(),
            ]);
            await Promise.all([
                Product.create({
                    name: 'Foo Product',
                    categoryId: foo.id
                }),
                Product.newProduct(cat1.id),
                Product.newProduct(cat1.id),
                Product.newProduct(cat2.id),

            ])
        })
}
// syncAndSeed()

module.exports = {
    syncAndSeed,
    models: {
        Product,
        Category,
    }
}
