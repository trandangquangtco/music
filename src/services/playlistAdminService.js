const PlaylistAdmin = require('../models/playlist-adminModel')
const { response } = require('../helpers/response')

const addPlaylistAdmin = async (body) => {
  try {
    const create = await PlaylistAdmin.create(body)
    return response('success', create)
  } catch (error) {
    throw error
  }
}

const findAllPlaylistAdmin = async (body, limit, page) => {
  try {
    const findAll = await PlaylistAdmin.findAll({
      where: body,
      limit: limit,
      offset: (limit * (page - 1))
    })
    return response('success', findAll)
  } catch (error) {
    throw error
  }
}

const findOnePlaylistAdmin = async (body) => {
  try {
    const findOne = await PlaylistAdmin.findOne({
      where: body
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

const updatePlaylistAdmin = async (id, body) => {
  try {
    const update = await PlaylistAdmin.update(body, {
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

const removePlaylistAdmin = async (body) => {
  try {
    const remove = await PlaylistAdmin.destroy({
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

module.exports = { addPlaylistAdmin, findAllPlaylistAdmin, findOnePlaylistAdmin, updatePlaylistAdmin, removePlaylistAdmin}