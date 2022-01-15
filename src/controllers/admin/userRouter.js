//=================IMPORT====================//
const router = require('express').Router()
const { omit } = require('lodash')
const { addUser, findOneUser, updateUser, removeUser, findAllUser } = require('../../services/userService')
const { fail } = require('../../helpers/response')
const { hashPassword } = require('../../helpers/hashPassword')

//=================GET LIST====================//
router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, ['limit', 'page'])
    const read = await findAllUser(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(read)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================UPDATE USER====================//
router.post('/update', async (req, res) => {
  try {
    const { body } = req
    if (!body.id) {
      res.json(fail('InvalidId', 'Id must be fill'))
    }
    const readOne = await findOneUser({ id: body.id })
    if (!readOne.data) {
      res.json(fail('IdNotFound', 'Id is not exist'))
    } else {
      const input = omit(body, 'id')
      if (body.password) {
        const passwordHashed = hashPassword(body.password)
        input.password = passwordHashed
      }
      await updateUser({ id: body.id }, input)
      const readOne = await findOneUser({ id: body.id })
      res.json(readOne)
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router
