require('dotenv').config()
const database = require('./utils/database-utils');

const app = require('./app')

database.sync(() => console.log(`Banco de dados conectado: ${process.env.DATABASE_NAME}`))

app.listen(process.env.PORT, () => console.log(`Servidor iniciado na porta ${process.env.PORT}`));

async function stop () {
  server.close()
}

module.exports = stop
