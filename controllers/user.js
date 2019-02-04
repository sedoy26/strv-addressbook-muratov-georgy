const { passwordUtil } = require('../utils/password')
const { dbDriver } = require('../db/index')
const { UserModel } = require('../db/userModel')
const { Response } = require('../utils/responses')
const { JWT } = require('../utils/jwt')

class UserController {
  async signup(email, password) {
    let response
    await dbDriver.findInstance({model: UserModel, data: { email } })
    .then(async ({ records : users }) => {
        if (users.length) {
          response = new Response(Response.codes.Conflict, Response.responses.Conflict)
        } else {
          let user = new UserModel({
            email: email,
            password: passwordUtil.hash(password)
          })
          dbDriver.saveInstance(user)
          response = new Response(Response.codes.Created, Response.responses.Created)
        }
      })
      .catch(e => {
        console.error(e.message)
        response = new Response(Response.codes.InternalError, Response.responses.InternalError)
      })
      return response
  }

  async login(email, password) {
    let response
    await dbDriver.findInstance({model: UserModel, data: { email } })
    .then(async ({ records : users }) => {
        if (!users.length) {
          response = new Response(Response.codes.Unauthorized, Response.responses.Unauthorized)
        } else {
          let isCorrect = passwordUtil.compare(password, users[0].password)
          if (isCorrect) {
              let accessToken = await JWT.generate({email: email})
              response = new Response(Response.codes.OK, Response.responses.OK, accessToken)
          } else response = new Response(Response.codes.Unauthorized, Response.responses.Unauthorized)
        }
      })
      .catch(e => {
        console.error(e.message)
        response = new Response(Response.codes.InternalError, Response.responses.InternalError)
      })
    return response
  }

  addContact(email, userEmail, phone, name) {
    let response
    try {
      let contact = {
        email: email,
        userEmail: userEmail,
        phone: phone,
        name: name
      }
      dbDriver.saveFirestore(contact)
      response = new Response(Response.codes.Created, Response.responses.Created)
    } catch(e) {
      console.error(e.message)
      response = new Response(Response.codes.InternalError, Response.responses.InternalError)
    }
    return response
  }
}

module.exports.UserController = new UserController()