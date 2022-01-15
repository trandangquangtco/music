//=================IMPORT====================//
const router = require('express').Router()
const { omit } = require('lodash')
const { fail } = require('../../helpers/response')
const { verifyToken } = require('../../helpers/token')
const { addPlaylistAdmin, findAllPlaylistAdmin, findOnePlaylistAdmin, updatePlaylistAdmin, removePlaylistAdmin } = require('../../services/playlistAdminService')

//=================CREATE====================//
router.post('/create', async (req, res) => {
  try {
    const { body } = req
    const decode = verifyToken(req.headers.token)
    body.adminId = decode.id
    const create = await addPlaylistAdmin(body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================GET LIST====================//
router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, ['limit', 'page'])
    const readAll = await findAllPlaylistAdmin(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(readAll)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================GET ONE====================//
router.post('/read-one', async (req, res) => {
  try {
    const create = await findOnePlaylistAdmin(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================UPDATE====================//
router.post('/update', async (req, res) => {
  try {
    const { body } = req
    if (!body.id) {
      res.status(401).json(fail('InvalidId', 'Id must be fill'))
    }
    const readOne = await findOnePlaylistAdmin({ id: body.id })
    if (!readOne.data) {
      res.json(fail('IdNotFound', 'Id is not exist'))
    } else {
      const input = omit(body, 'id')
      await updatePlaylistAdmin({ id: body.id }, input)
      const readOne = await findOnePlaylistAdmin({ id: body.id })
      res.json(readOne)
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================DELETE====================//
router.post('/delete', async (req, res) => {
  try {
    const remove = await removePlaylistAdmin(req.body)
    res.json(remove)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router