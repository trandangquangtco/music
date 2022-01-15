const jwt = require('jsonwebtoken')

const signTokenAdmin = (payload) => {
  payload.role = 'admin'
  const token = jwt.sign({ id: payload.id, role: payload.role }, process.env.SECRET_KEY_TOKEN || 'quang', { expiresIn: '1h' })
  return token
}

const signTokenLogin = (payload) => {
  payload.role = 'user'
  const token = jwt.sign({ id: payload.id, role: payload.role }, process.env.SECRET_KEY_TOKEN || 'quang', { expiresIn: '1h' })
  return token
}

const verifyToken = (token) => {
  const decode = jwt.verify(token, process.env.SECRET_KEY_TOKEN || 'quang')
  return decode
}

module.exports = { signTokenAdmin, signTokenLogin, verifyToken }