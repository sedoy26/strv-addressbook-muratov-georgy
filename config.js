const port = process.env.PORT || 3000
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const dbHost = process.env.MONGODB_URI || 'localhost:27017'
const dbName = process.env.DB_NAME || 'strvDB'

const config = {
  port,
  emailRegex,
  database: {
    name: dbName,
    host: dbHost
  },
  jwt: {
    secret: 'strvjwtsecret'
  }
}

module.exports.config = config
