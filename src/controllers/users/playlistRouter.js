//==================IMPORT=====================//
const router = require('express').Router()
const { omit } = require('lodash')
const { fail } = require('../../helpers/response')
const { verifyToken } = require('../../helpers/token')
const { addPlaylist, findOnePlaylist, updatePlaylist, removePlaylist } = require('../../services/playlistService')

//==================CREATE=====================//
router.post('/create', async (req, res) => {
  try {
    const { body } = req
    const decode = verifyToken(req.headers.token)
    body.userId = decode.id
    const input = omit(body, 'id')
    const create = await addPlaylist(input)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================GET LIST=====================//
router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const decode = verifyToken(req.headers.token)
    body.userId = decode.id
    const readOne = await findOnePlaylist(body)
    res.json(readOne)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================UPDATE=====================//
router.post('/update', async (req, res) => {
  try {
    const decode = verifyToken(req.headers.token)
    const { body } = req
    const input = omit(body, ['id', 'userId'])
    await updatePlaylist({ id: body.id, userId: decode.id }, input)
    const readOne = await findOnePlaylist({ id: decode.id })
    res.json(readOne)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================DELETE=====================//
router.post('/delete', async (req, res) => {
  try {
    const decode = verifyToken(req.headers.token)
    const remove = await removePlaylist({ id: req.body.id, userId: decode.id })
    res.json(remove)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router