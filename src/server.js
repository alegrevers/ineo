require('dotenv').config()
const database = require('./utils/database-utils');

const app = require('./app')

database.sync(() => console.log(`Banco de dados conectado: ${process.env.DATABASE_NAME}`))

const server = app.listen(process.env.PORT, () => console.log(`Servidor iniciado na porta ${process.env.PORT}`));

server

function stop () {
  server.close()
}

module.exports = { stop, server }
