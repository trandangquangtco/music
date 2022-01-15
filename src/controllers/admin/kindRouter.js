const router = require('express').Router()
const { omit } = require('lodash')
const { fail } = require('../../helpers/response')
const { addKind, findAllKind, findOneKind, updateKind, removeKind } = require('../../services/kindService')

router.post('/create', async (req, res) => {
  try {
    const create = await addKind(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, ['limit', 'page'])
    const readAll = await findAllKind(input, parseInt(req.body.limit) || 50, parseInt(req.body.page)|| 1)
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

router.post('/update', async (req, res) => {
  try {
    const { body } = req
    if (!body.kind) {
      res.status(401).json(fail('InvalidId', 'Id must be fill'))
    }
    const readOne = await findOneKind({ kind: body.kind })
    if (!readOne.data) {
      res.json(fail('KindNotFound', 'Kind is not exist'))
    } else {
      const input = omit(body, 'id')
      await updateKind({ id: body.id }, input)
      const readOne = await findOneKind({ id: body.id })
      res.json(readOne)
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/delete', async (req, res) => {
  try {
    const create = await removeKind(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router