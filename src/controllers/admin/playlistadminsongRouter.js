//=================GET LIST====================//
const router = require('express').Router()
const { omit } = require('lodash')
const { fail } = require('../../helpers/response')
const { addPlaylistadminsong, findAllPlaylistadminsong, findOnePlaylistadminsong, updatePlaylistadminsong, removePlaylistadminsong } = require('../../services/playlistadminsongService')

//=================CREATE====================//
router.post('/create', async (req, res) => {
  try {
    const create = await addPlaylistadminsong(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================GET SONGS FROM PLAYLIST====================//
router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = {
      playlistAdminId: req.body.playlistAdminId
    }
    const readAll = await findAllPlaylistadminsong(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(readAll)
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
    const readOne = await findOnePlaylistadminsong({ id: body.id })
    if (!readOne.data) {
      res.json(fail('IdNotFound', 'Id is not exist'))
    } else {
      const input = omit(body, 'id')
      await updatePlaylistadminsong({ id: body.id }, input)
      const readOne = await findOnePlaylistadminsong({ id: body.id })
      res.json(readOne)
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================DELETE====================//
router.post('/delete', async (req, res) => {
  try {
    const create = await removePlaylistadminsong(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router