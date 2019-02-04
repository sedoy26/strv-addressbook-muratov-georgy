const responses = {
  Unauthorized: 'Unauthorized',
  Conflict: 'User with such email already registered',
  InternalError: 'InternalError',
  Created: 'Created',
  Forbidden: 'Forbidden',
  OK: 'OK!',
  Unprocessable: 'Unprocessable Entity'
}

const codes = {
  Unauthorized: 401,
  Forbidden: 403,
  Conflict: 409,
  InternalError: 500,
  Created: 201,
  OK: 200,
  Unprocessable: 422
}

class Response {
  constructor(status, message, payload) {
    this.status = status
    this.message = message
    this.payload = payload
  }
}

Response.responses = responses
Response.codes = codes

module.exports.Response = Response