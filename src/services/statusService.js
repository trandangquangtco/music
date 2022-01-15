//=================IMPORT====================//
const Status = require('../models/statusModel')
const { response } = require('../helpers/response')

//=================CREATE====================//
const addStatus = async (body) => {
  try {
    const create = await Status.create(body)
    return response('success', create)
  } catch (error) {
    throw error
  }
}

//=================GET LIST====================//
const findAllStatus = async (body, limit, page) => {
  try {
    const findAll = await Status.findAll({
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
const findOneStatus = async (body) => {
  try {
    const findOne = await Status.findOne({
      where: body
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

//=================UPDATE====================//
const updateStatus = async (id, body) => {
  try {
    const update = await Status.update(body, {
      where: id,
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
const removeStatus = async (body) => {
  try {
    const remove = await Status.destroy({
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

module.exports = { addStatus, findAllStatus, findOneStatus, updateStatus, removeStatus}