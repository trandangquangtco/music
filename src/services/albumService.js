//=================IMPORT====================//
const Album = require('../models/albumModel')
const { response } = require('../helpers/response')

//=================CREATE====================//
const addAlbum = async (body) => {
  try {
    const create = await Album.create(body)
    return response('success', create)
  } catch (error) {
    throw error
  }
}

//=================GET LIST====================//
const findAllAlbum = async (body, limit, page) => {
  try {
    const findAll = await Album.findAll({
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
const findOneAlbum = async (body) => {
  try {
    const findOne = await Album.findOne({
      where: body
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

//=================UPDATE====================//
const updateAlbum = async (id, body) => {
  try {
    const update = await Album.update(body, {
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
const removeAlbum = async (body) => {
  try {
    const remove = await Album.destroy({
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

module.exports = { addAlbum, findAllAlbum, findOneAlbum, updateAlbum, removeAlbum}