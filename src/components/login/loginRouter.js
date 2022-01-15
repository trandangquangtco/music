const router = require('express').Router()
const { checkPassword } = require('../../helpers/hashPassword')
const { signTokenLogin, signTokenAdmin } = require('../../helpers/token')
const { findOneUser, updateUser } = require('../../services/userService')
const { findOneAdmin, updateAdmin } = require('../../services/adminService')
const { fail } = require('../../helpers/response')


router.post('/admin', async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password
    }
    if (!body.email || !body.password) {
      res.json(fail('incompleteInput', 'Email & Password must be fill'))
    }
    const readOne = await findOneAdmin({ email: body.email })
    if (!readOne.data) {
      res.json(fail('InvalidEmail', 'wrong-email'))
    } else {
      const comparePassword = checkPassword(body.password, readOne.data.password)
      if (!comparePassword) {
        res.json(fail('InvalidPassword', 'wrong-password'))
      } else {
        const payload = {
          id: readOne.data.id,
          createdAt: Date.now()
        }
        const token = signTokenAdmin(payload)
        await updateAdmin({ id: payload.id }, { token: token })
        res.json({
          message: 'success',
          adminToken: token,
        })
      }
    }
  } catch (error) {
    res.json(fail('error', error.message))
  }
})

router.post('/user', async (req, res) => {
  try {
    const body = {
      email: req.body.email,
      password: req.body.password
    }
    if (!body.email) {
      res.json(fail('incompleteEmail', 'Email must be fill'))
    }
    const readOne = await findOneUser({ email: body.email })
    if (!readOne.data) {
      res.json(fail('InvalidEmail', 'Email is not exist'))
    } else {
      const comparePassword = checkPassword(body.password, readOne.data.password)
      if (!comparePassword) {
        res.json(fail('InvalidPassword', 'wrong password'))
      } else {
        const payload = {
          id: readOne.data.id,
          createdAt: Date.now()
        }
        const token = signTokenLogin(payload)
        await updateUser({ id : payload.id}, { token: token })
        res.json({
          status: 'success',
          loginToken: token
        })
      }
    }
  } catch (error) {
    console.log(error);
    res.json(fail('error', error.message))
  }
})

module.exports = router