const router = require('express').Router()
const { fail } = require('../../helpers/response')
const { findOneGenre, findAllGenre } = require('../../services/genreService')

router.post('/read', async (req, res) => {
  try {
    const readAll = await findAllGenre(req.body)
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

module.exports = router