const port = process.env.PORT || 3000
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/strvDB'

const config = {
  port,
  emailRegex,
  database: {
    uri: dbURI
  },
  jwt: {
    secret: 'strvjwtsecret'
  }
}

module.exports.config = config
