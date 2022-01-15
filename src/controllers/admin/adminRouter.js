const express = require('express')
const { omit } = require('lodash')
const { response, fail} = require('../../helpers/response')
const { hashPassword, checkPassword } = require('../../helpers/hashPassword')
const { addAdmin, findAllAdmin, findOneAdmin, updateAdmin, removeAdmin } = require('../../services/adminService')
const { signTokenAdmin } = require('../../helpers/token')
const router = express.Router()


//=================CREATE====================//
router.post('/create', async (req, res) => {
  try {
    const { body } = req
    const passwordHashed = hashPassword(body.password)
    body.password = passwordHashed
    const create = await addAdmin(body)
    const token = signTokenAdmin(create.data.id)
    await updateAdmin({id: create.data.id}, { token: token })
    const readOne = await findOneAdmin(req.body)
    res.json(readOne)
  } catch (error) {
    console.log(error);
    res.json(fail('error', error.message))
  }
})

//=================GET LIST====================//
router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, ['limit', 'page', 'password'])
    const read = await findAllAdmin(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(read)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================UPDATE====================//
router.post('/update', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, 'id')
    if (body.password) {
      const passwordHashed = hashPassword(body.password)
      input.password = passwordHashed
    }
    await updateAdmin({ id:body.id }, input)
    const readOne = await findOneAdmin({ id: body.id })
    res.json(readOne)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================DELETE====================//
router.post('/delete', async (req, res) => {
  try {
    const remove = await removeAdmin({ id: req.body.id })
    res.json(remove)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router