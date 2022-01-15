const router = require('express').Router()
const { omit } = require('lodash')
const { fail } = require('../../helpers/response')
const { findAllKind, findOneKind } = require('./kindService')

router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, ['limit', 'page'])
    const readAll = await findAllKind(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(readAll)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/read-one', async (req, res) => {
  try {
    const create = await findOneKind(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router