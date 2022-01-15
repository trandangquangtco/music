//=================IMPORT====================//
const router = require('express').Router()
const { omit } = require('lodash')
const { addUser, findOneUser, updateUser } = require('../../services/userService')
const { fail } = require('../../helpers/response')
const { hashPassword } = require('../../helpers/hashPassword')
const { verifyToken } = require('../../helpers/token')

//=================CREATE====================//
router.post('/signin', async (req, res) => {
  try {
    const passwordHashed = hashPassword(req.body.password)
    const { body } = req
    body.password = passwordHashed
    const create = await addUser(body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================PROFILE====================//
router.post('/profile', async (req, res) => {
  try {
    const decode = verifyToken(req.headers.token)
    const readOne = await findOneUser({ id: decode.id })
    res.json(readOne)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================UPDATE====================//
router.post('/update', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, ['id', 'active'])
    const decode = verifyToken(req.headers.token)
    await updateUser(decode.id, input)
    const readOne = await findOneUser({ id: decode.id })
    res.json(readOne)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router;