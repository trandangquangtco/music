//=================IMPORT====================//
const router = require('express').Router()
const { omit } = require('lodash')
const  { updateArtist } = require('../../services/artistService')
const { fail } = require('../../helpers/response')

//=================GET LIST====================//
router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = omit(body, ['limit', 'page'])
    const read = await findAllArtist(input, parseInt(body.limit) || 50, parseInt(body.page)|| 1)
    res.json(read)
  } catch (error) {
    console.log(error);
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
    const readOne = await findOneArtist({ id: body.id })
    if (!readOne.data) {
      res.json(fail('IdNotFound', 'Id is not exist'))
    } else {
      const input = omit(body, 'id')
      await updateArtist({ id: body.id }, input)
      const readOne = await findOneArtist({ id: body.id })
      res.json(readOne)
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router