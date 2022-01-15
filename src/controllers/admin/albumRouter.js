//==================IMPORT=====================//
const router = require('express').Router()
const { omit } = require('lodash')
const { findOneAlbum, updateAlbum, removeAlbum } = require('../../services/albumService')
const { fail } = require('../../helpers/response')

//==================UPDATE ALBUM=====================//
router.post('/update', async (req, res) => {
  try {
    const { body } = req
    if (!body.id) {
      res.json(fail('InvalidId', 'Id must be fill'))
    }
    const checkOne = await findOneAlbum({ id: body.id })
    if (!checkOne.data) {
      res.json(fail('InvalidId', 'Id is not exist'))
    } else {
      const input = omit(body, 'id')
      await updateAlbum({ id: body.id }, input)
      const readOne = await findOneAlbum({ id: body.id })
      res.json(readOne)
    }
  } catch (error) {
    console.log(error);
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
    const read = await findAllAlbum(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(read)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})