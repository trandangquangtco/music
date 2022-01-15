const router = require('express').Router()
const { signTokenLogin, verifyToken } = require('../../helpers/token')
const { findOneUser, updateUser } = require('../../services/userService')
const { fail, response } = require('../../helpers/response')

router.post('/', async (req, res) => {
  try {
    if (!req.headers.token) {
      res.status(401).json(fail('UnAuthenticate', 'Login is required', 'fail'))
    }
    const decode = verifyToken(req.headers.token)
    const payload = {
      id: decode.id,
      createdAt: Date.now()
    }
    const readOne = await findOneUser({ id: payload.id })
    if (!readOne.data) {
      res.json(fail('IdNotFound', 'Id is not exist', 'fail'))
    } else {
      const token = signTokenLogin(payload)
      await updateUser({ id: decode.id, token: token })
      res.json(response('success', null, 'logout'))
    }
  } catch (error) {
    res.json(fail('error', error.message, 'fail'))
  }
})

module.exports = router