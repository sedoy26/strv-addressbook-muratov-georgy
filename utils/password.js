const bcrypt = require('bcryptjs')

const salt = 'strvrandowsalt' // TODO add to config

class PasswordUtil {
  hash(password) {
    return bcrypt.hashSync(password + salt, 12)
  }

  compare(password, dbPass) {
    return bcrypt.compareSync(password + salt, dbPass)
  }
}

module.exports.passwordUtil = new PasswordUtil()
