const expect = require('chai').expect
const { passwordUtil } = require('../../utils/password')

describe('PasswordUtil tests', () => {
  describe('Check if passwordUtil works correctly', () => {
    it('Should return true for correct password', () => {
      let password = passwordUtil.hash('pass')
      expect(passwordUtil.compare('pass', password)).to.equal(true)
    })

    it('should return false for incorrect password', () => {
      let password = passwordUtil.hash('pass')
      expect(passwordUtil.compare('wrongpass', password)).to.equal(false)
    })
  })
})

