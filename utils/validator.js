const { config } = require('../config')
const { Response } = require('../utils/responses')

class Validator {
  signup(req, res, next) {
    let response
    if (!req.body.email || !config.emailRegex.test(req.body.email)) {
      response = new Response(Response.codes.Unprocessable, Response.responses.Unprocessable)
      return next(response)
    }
    if (!req.body.password || req.body.password.length < 8) {
      response = new Response(Response.codes.Unprocessable, Response.responses.Unprocessable)
      return next(response)
    }
    return next()
  }

  login(req, res, next) {
    let response
    if (!req.body.email || !req.body.password) {
      response = new Response(Response.codes.Unprocessable, Response.responses.Unprocessable)
      return next(response)
    }
    if (!req.body.email || !req.body.password) {
      response = new Response(Response.codes.Forbidden, Response.responses.Forbidden)
      return next(response)
    }
    return next()
  }

  addContact(req, res, next) {
    let response
    if (!req.body.email || !req.body.name || !req.body.phone) {
      response = new Response(Response.codes.Unprocessable, Response.responses.Unprocessable)
      return next(response)
    }
    return next()
  }
}

module.exports.Validator = new Validator() 