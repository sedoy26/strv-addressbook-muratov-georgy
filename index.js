const express = require('express')
const bodyParser = require('body-parser')

const { dbDriver } = require('./db/index')
const { routes } = require('./routes')
const { config } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use('/', routes)

let server 
const connections = []

connections.push(dbDriver.connectFirestore())
connections.push(
  dbDriver.openConnection()
    .then(() => {
      console.log('Successfully connected to DB')
    })
)

Promise.all(connections)
  .then(() => {
    server = app.listen(config.port, () => {
      console.log('Express server listening on port ' + config.port)
    })
  })
  .catch(error => {
    console.log(error)
  })

process.on('SIGINT', () => {
  console.info('SIGINT signal received.')
  console.log('Closing http server.')
  server.close(() => {
    console.log('Http server closed.')
    dbDriver.closeConnection()
  });
})

module.exports.app = app