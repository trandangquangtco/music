const router = require('express').Router()
const { omit } = require('lodash')
const { fail, response } = require('../../helpers/response')
const { verifyToken } = require('../../helpers/token')
const { addLikeSong, findAllLikeSong, findOneLikeSong, updateLikeSong } = require('../../services/likeSongService')

//=================LIKE + UNLIKE====================//
router.post('/like', async (req, res) => {
  try {
    const userId = verifyToken(req.headers.token)
    const body = {
      userId: userId,
      songId: req.body.songId
    }
    const checkLikeExist = await findOneLikeSong(body)
    if (!checkLikeExist.data) {
      const create = await addLikeSong(body)
      res.json(create)
    } else {
      const input = {
        active: !readOne.data.active
      }
      await updateLikeSong({ id: body.id }, input)
      res.json(response('success'))
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

//=================GET LIST BY USER====================//
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

module.exports = router