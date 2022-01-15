//==================IMPORT=====================//
const router = require('express').Router()
const { omit } = require('lodash')
const { fail, response } = require('../../helpers/response')
const { addPlaylistsong, findAllPlaylistsong, findOnePlaylistsong, removePlaylistsong } = require('../../services/playlistsongService')

//==================CREATE=====================//
router.post('/create', async (req, res) => {
  try {
    const body = {
      songId: req.body.songId,
      playlistId: req.body.playlistId
    }
    const create = await addPlaylistsong(body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================GET SONGS IN PLAYLIST=====================//
router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = {
      playlistId: body.playlistId,
    }
    const readAll = await findAllPlaylistsong(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(readAll)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================GET A SONG IN PLAYLIST=====================//
router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = {
      playlistId: body.playlistId,
      songId: body.songId
    }
    const readAll = await findAllPlaylistsong(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(readAll)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================UPDATE=====================//
router.post('/update', async (req, res) => {
  try {
    const { body } = req
    if (!body.id) {
      res.status(401).json(fail('InvalidId', 'id must be fill'))
    }
    const readOne = await findOnePlaylistsong({ id: body.id })
    if (!readOne.data) {
      res.json(fail('NotFound', 'id is Not found'))
    } else {
      const input = {
        songId: body.songId,
        playlistId: body.playlistId
      }
      await updatePlaylist({ id: body.id }, input)
      const readOne = await findOnePlaylistsong({ id: body.id })
      res.json(response('success', readOne, 'OK'))
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//==================DEL SONG FROM LIST=====================//
router.post('/delete', async (req, res) => {
  try {
    const { body } = req
    const input = {
      songId: body.songId,
      playlistId: body.playlistId
    }
    const remove = await removePlaylistsong(input)
    res.json(remove)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router