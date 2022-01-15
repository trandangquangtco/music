const router = require('express').Router()
const { omit } = require('lodash')
const { fail } = require('../../helpers/response')
const { findAllLikeSong, findOneLikeSong, updateLikeSong, removeLikeSong } = require('../../services/likeSongService')

router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, ['limit', 'page'])
    const readAll = await findAllLikeSong(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(readAll)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/update', async (req, res) => {
  try {
    const { body } = req
    if (!body.id) {
      res.status(401).json(fail('InvalidId', 'Id must be fill'))
    }
    const readOne = await findOneLikeSong({ id: body.id })
    if (!readOne.data) {
      res.json(fail('IdNotFound', 'Id is not exist'))
    } else {
      const input = _.omit(body, 'id')
      await updateLikeSong({ id: body.id }, input)
      const readOne = await findOneLikeSong({ id: body.id })
      res.json(readOne)
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/delete', async (req, res) => {
  try {
    const create = await removeLikeSong(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router