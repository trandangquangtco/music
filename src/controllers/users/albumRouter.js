//==================IMPORT=====================//
const router = require('express').Router()
const { omit } = require('lodash')
const { addAlbum, findOneAlbum, updateAlbum, removeAlbum } = require('../../services/albumService')
const { fail } = require('../../helpers/response')
const { verifyToken } = require('../../helpers/token')

//==================CREATE ALBUM=====================//
router.post('/create', async (req, res) => {
  try {
    const { body } = req
    const decode = verifyToken(req.headers.token)
    body.userId = decode.id
    const input = omit(body, ['id', 'count_like', 'count_views', 'count_purchase', 'count_rates', 'rates', 'approved', 'active'])
    const create = await addAlbum(input)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================GET ONE=====================//
router.post('/read-one', async (req, res) => {
  try {
    const readOne = await findOneAlbum(req.body)
    res.json(readOne)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================GET LIST=====================//
router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, ['limit', 'page'])
    const read = await findAllAlbum(input, parseInt(req.body.limit) || 50, parseInt(req.body.page)|| 1)
    res.json(read)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================UPDATE ALBUM====================//
router.post('/update', async (req, res) => {
  try {
    const { body } = req
    const decode = verifyToken(req.headers.token)
    const checkOne = await findOneAlbum({ id: body.id })
    if (!checkOne.data) {
      res.json(fail('NotFound', 'Album is not found'))
    }
    const input = omit(body, ['id', 'count_like', 'count_views', 'count_purchase', 'count_rates', 'rates', 'approved', 'active'])
    await updateAlbum({ id: body.id, userId }, input)
    const readOne = await findOneAlbum({ id: body.id })
    res.json(readOne)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================DELETE ALBUM=====================//
router.post('/delete', async (req, res) => {
  try {
    const remove = await removeAlbum(req.body)
    res.json(remove)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router