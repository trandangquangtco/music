//=================IMPORT====================//
const express = require('express')
const { signTokenAdmin } = require('../../helpers/token')
const { fail } = require('../../helpers/response')
const { updateAdmin, findAdminByEmail } = require("../../services/adminService")
const { checkPassword, hashPassword } = require("../../helpers/hashPassword")
const { sendMail } = require("../../components/mail/Mail")
const { addToken, findToken } = require("../../services/tokenService")
const router = express.Router()

//=================GET ONE====================//
router.post('/login', async (req, res) => {
  try {
    const readOne = await findAdminByEmail(req.body.email)
    if (!readOne.data) {
      res.status(500).json(fail('error', 'Invalid email'))
    } else {
      if (!checkPassword(req.body.password, readOne.data.password)) {
        res.status(500).json(fail('error', 'Wrong password'))
      } else {
        const token = signTokenAdmin(readOne.data.toJSON())
        readOne.token = token
        res.json(readOne);
      }
    }

  } catch (error) {
    res.status(500).json(fail('error', error.message))
  }
})

router.post("/forgot-password", async (req, res) => {
  try {
    const admin = await findAdminByEmail(req.body.email)
    if (!admin.data) {
      res.status(500).json(fail('error', 'Invalid email'))
    } else {
      const timeStr = new Date().getTime().toString()
      const code = timeStr.substring(timeStr.length - 4, timeStr.length)
      const token = await addToken({ adminId: admin.data.id, token: code })
      sendMail(req.body.email, "Verification code from grafsound", code)
      res.json({ message: 'Sent verification code to email' })
    }
  } catch (error) {
    res.status(500).json(fail('error', error.message))
  }
})

router.post("/forgot-password/confirm", async (req, res) => {
  try {
    const token = await findToken(req.body.token)
    if (!token.data) {
      res.status(500).json(fail('error', 'Invalid confirmation code'))
    } else {
      res.json({ message: 'Verification successfully', userId: token.data.adminId })
    }
  } catch (error) {
    res.status(500).json(fail('error', error.message))
  }
})

router.post("/forgot-password/new", async (req, res) => {
  try {
    const updated = await updateAdmin(req.body.id, { password: hashPassword(req.body.password) })
    res.json({ message: 'Update password successfully' })
  } catch (error) {
    res.status(500).json(fail('error', error.message))
  }
})

module.exports = router;