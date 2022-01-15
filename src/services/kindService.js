//=================IMPORT====================//
const Kind = require('../models/kindModel')
const { response } = require('../helpers/response')

//=================CREATE====================//
const addKind = async (body) => {
  try {
    const create = await Kind.create(body)
    return response('success', create)
  } catch (error) {
    throw error
  }
}

//=================GET LIST====================//
const findAllKind = async (body, limit, page) => {
  try {
    const findAll = await Kind.findAll({
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
const findOneKind = async (body) => {
  try {
    const findOne = await Kind.findOne({
      where: body
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

//=================UPDATE====================//
const updateKind = async (id, body) => {
  try {
    const update = await Kind.update(body, {
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
const removeKind = async (body) => {
  try {
    const remove = await Kind.destroy({
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

module.exports = { addKind, findAllKind, findOneKind, updateKind, removeKind}