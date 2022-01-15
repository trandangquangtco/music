const bcrypt = require('bcryptjs')
const saltRounds = 10;

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash
}

const checkPassword = (passwordInput, hashed) => {
  const check = bcrypt.compareSync(passwordInput, hashed);
  return check
}

module.exports = { hashPassword, checkPassword }