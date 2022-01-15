const router = require('express').Router()
const { signTokenAdmin, verifyToken } = require('../../helpers/token')
const { findOneAdmin, updateAdmin } = require('../admin/adminService')
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
    const readOne = await findOneAdmin({ id: payload.id })
    if (!readOne.data) {
      res.json(fail('IdNotFound', 'Id is not exist', 'fail'))
    } else {
      const token = signTokenAdmin(payload)
      await updateAdmin({ id: payload.id, token: token })
      res.json(response('success', null, 'logout'))
    }
  } catch (error) {
    res.json(fail('error', error.message, 'fail'))
  }
})

module.exports = router