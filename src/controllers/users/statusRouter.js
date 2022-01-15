const router = require('express').Router()
const { fail } = require('../../helpers/response')
const { addStatus, findAllStatus, findOneStatus, removeStatus } = require('../../services/statusService')

router.post('/create', async (req, res) => {
  try {
    const create = await addStatus(req.body)
    res.json(create)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/read', async (req, res) => {
  try {
    const { body } = req
    const input = _.omit(body, ['limit', 'page'])
    const read = await findAllStatus(input, parseInt(req.body.limit) || 50, parseInt(req.body.page)|| 1)
    res.json(read)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/read-one', async (req, res) => {
  try {
    const readOne = await findOneStatus(req.body)
    res.json(readOne)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/update', async (req, res) => {
  try {
    const { body } = req
    if (!body.id) {
      res.json(fail('InvalidId', 'Id must be fill'))
    }
    const readOne = await findOneStatus({ id: req.body.id })
    if (!readOne.data) {
      res.json(fail('InvalidId', 'Id is not exist'))
    } else {
      const input = _.omit(body, 'id')
      await updateStatus({ id: body.id }, input)
      const readOne = await findOneStatus({ id: req.body.id })
      res.json(readOne)
    }
  } catch (error) {
    console.log(error);
    res.json(fail('error', error.message))
  }
})

router.post('/delete', async (req, res) => {
  try {
    const remove = await removeStatus(req.body)
    res.json(remove)
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

module.exports = router
