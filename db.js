const db = require('./models')
const app = require('./server')

db.syncAndSeed()

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}.`));

// module.exports = {
//     db
// }
