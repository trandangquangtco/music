//==================IMPORT=====================//
const Admin = require('../models/adminModel')
const { response } = require('../helpers/response')
const PlaylistAdmin = require('../models/playlist-adminModel')

//=================REFERENCE=================//
Admin.hasMany(PlaylistAdmin, {
  foreignKey: 'id'
})
PlaylistAdmin.belongsTo(Admin, {
  foreignKey: 'adminId'
})

//=================CREATE====================//
const addAdmin = async (body) => {
  try {
    const create = await Admin.create(body)
    return {
      message: 'success',
      data: create
    }
  } catch (error) {
    throw error
  }
}

//=================GET LIST====================//
const findAllAdmin = async (body, limit, page) => {
  try {
    const findAll = await Admin.findAll({
      where: body,
      limit: limit,
      offset: (limit * (page - 1))
    })
    return response('success', findAll)
  } catch (error) {
    throw error
  }
}

//=================GET ONE====================//
const findOneAdmin = async (body) => {
  try {
    const findOne = await Admin.findOne({
      where: body
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

//=================UPDATE====================//
const updateAdmin = async (id, body) => {
  try {
    const update = await Admin.update(body, {
      where: { id: id },
      returning: true,
      plain: true
    })
    return {
      message: 'success',
      data: update
    }
  } catch (error) {
    throw error
  }
}

//=================DELETE====================//
const removeAdmin = async (body) => {
  try {
    const remove = await Admin.destroy({
      where: body
    })
    return {
      message: 'success',
      data: remove
    }
  } catch (error) {
    throw error
  }
}

//=================FIND BY email====================//
const findAdminByEmail = async (email) => {
  try{
    const admin = await Admin.findOne({
      where: {email: email}
    });
    return {
      message: 'success',
      data: admin
    }
  } catch (error) {
    throw error
  }
}

module.exports = { addAdmin, findAllAdmin, findOneAdmin, updateAdmin, removeAdmin, findAdminByEmail }