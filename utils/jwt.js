const { Response } = require('../utils/responses')
const jwt = require('jsonwebtoken')

const { config: { jwt: { secret } } } = require('../config')

class JWT {
  generate ({ email }) {
    return new Promise((resolve, reject) => {
      return jwt.sign({email}, secret, { expiresIn: '1h' }, (err, token) => {
        if (err) {
          console.error('Error while generationg a token')
          return reject(err)
        } else {
          return resolve(token)
        }
      })
    })
  }

  verifyToken ( token ) {
    return new Promise((resolve, reject) => {
      return jwt.verify(token, secret, (err, payload) => {
        if (err){
          return reject (err)
        }
        else {
          return resolve (payload)
        }
      })
    }) 
  }

  async auth (req, res, next) {
    let response
    const authHeader = req.header('authorization')
    if (!authHeader) {
      response = new Response(Response.codes.Unauthorized, Response.responses.Unauthorized)
      return next(response)
    }
    let bearer = authHeader.split('Bearer ')
    if (!bearer[1]) {
      response = new Response(Response.codes.Unauthorized, Response.responses.Unauthorized)
      return next(response)
    } else {
      try {
        await jwt.verify(bearer[1], secret, (err, decoded) => {
          if (err) {
            response = new Response(Response.codes.Unauthorized, Response.responses.Unauthorized)
            return next(response)
          }
          req.userEmail = decoded.email
          next()
        })
      } catch (e) {
        response = new Response(Response.codes.InternalError, Response.responses.InternalError)
        return next(response)
      }
    }
  }
}

module.exports.JWT = new JWT()
