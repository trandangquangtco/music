//=================IMPORT====================//
const router = require('express').Router()
const { omit } = require('lodash')
const { fail } = require('../../helpers/response')
const { addSong, findOneSong } = require('../../services/songService')

//=================CREATE====================//
router.post('/create', async (req, res) => {
  try {
    const { body } = req
    if (!body.userId) { body.userId = 1 }
    const create = await addSong(body)
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
      res.json(fail('InvalidId', 'Id must be fill'))
    }
    const readOne = await findOneSong({ id: body.id })
    if (!readOne.data) {
      res.json(fail('InvalidId', 'Id is not exist'))
    } else {
      const input = omit(body, 'id')
      await updateSong({ id: body.id }, input)
      const readOne = await findOneSong({ id: body.id })
      res.json(readOne)
    }
  } catch (error) {
    console.log(error);
    res.json(fail('error', error.message))
  }
})

//=================DELETE====================//
router.post('/delete', async (req, res) => {
  try {
    const remove = await removeSong(req.body)
    res.json(remove)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router