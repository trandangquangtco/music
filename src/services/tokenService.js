const Token = require('../models/tokenModel')
const User = require('../models/userModel')
const { response } = require('../helpers/response')
const Admin = require('../models/adminModel')

//=================REFERENCE====================//
Token.belongsTo(User, {
  foreignKey: 'user_id'
})
Token.belongsTo(Admin, {
  foreignKey: 'admin_id'
})

//=================CREATE====================//
const addToken = async (body) => {
  try {
    const create = await Token.create(body)
    return response('success', create)
  } catch (error) {
    throw error
  }
}

//=================FIND ONE====================//
const findToken = async (token) => {
  try {
    const findOne = await Token.findOne({
      where: { token: token }
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

//=================REMOVE====================//
const removeToken = async (token) => {
  try {
    const removed = await Token.destroy({
      where: { token: token }
    })
    return response('success', removed)
  } catch (error) {
    throw error
  }
}


module.exports = { addToken, findToken, removeToken }

