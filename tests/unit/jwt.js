const expect = require('chai').expect
const { JWT } = require('../../utils/jwt')
const jwt = require('jsonwebtoken')
const { config: { jwt: { secret } } } = require('../../config')

let token
let payload

describe('JWT tests ', () => {
  before(
    async () => {
      token = await JWT.generate({ email: 'test@strv.com' })
      payload = await JWT.verifyToken(token)
    }
  )

  describe('Generation tests', () => {
    it('Check if token verified correctly', () => {
      expect(jwt.verify(token, secret)).to.include({ email: 'test@strv.com' })
    });
    it('Check if token verified correctly', () => {
      expect(jwt.verify(token, secret)).to.not.include({ email: 'wrong@strv.com' })
    });
  });

  describe('Verification tests', () => {
    it('Check if test token can be verified', () => {
      expect(payload).to.include({ email: "test@strv.com" })
    })
    it('Check if test token can be verified', () => {
      expect(payload).to.not.include({ email: "wrong@strv.com" })
    })
  })
})