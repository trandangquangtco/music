const router = require('express').Router()
const { fail } = require('../../helpers/response')
const { addGenre, findOneGenre, updateGenre, removeGenre, findAllGenre } = require('../../services/genreService')

router.post('/create', async (req, res) => {
  try {
    const create = await addGenre(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/read', async (req, res) => {
  try {
    const readAll = await findAllGenre(req.body, req.body.limit || 10, req.body.page || 1)
    res.json(readAll)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/read-one', async (req, res) => {
  try {
    const create = await findOneGenre(req.body)
    res.json(create)
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
    const readOne = await findOneGenre({ id: req.body.id })
    if (!readOne.data) {
      res.json(fail('IdNotFound', 'Id is not exist'))
    } else {
      const input = _.omit(body, 'id')
      await updateGenre({ id: body.id }, input)
      const readOne = await findOneGenre({ id: req.body.id })
      res.json(readOne)
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/delete', async (req, res) => {
  try {
    const create = await removeGenre(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router