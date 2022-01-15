const Playlistsong = require('../models/playlistsongModel')
const { response } = require('../helpers/response')

const addPlaylistsong = async (body) => {
  try {
    const create = await Playlistsong.create(body)
    return response('success', create)
  } catch (error) {
    throw error
  }
}

const findAllPlaylistsong = async (body, limit, page) => {
  try {
    const findAll = await Playlistsong.findAll({
      where: body,
      limit: limit,
      offset: (limit * (page - 1))
    })
    return response('success', findAll)
  } catch (error) {
    throw error
  }
}

const findOnePlaylistsong = async (body) => {
  try {
    const findOne = await Playlistsong.findOne({
      where: body
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

const updatePlaylistsong = async (id, body) => {
  try {
    const update = await Playlistsong.update(body, {
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

const removePlaylistsong = async (body) => {
  try {
    const remove = await Playlistsong.destroy({
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

module.exports = { addPlaylistsong, findAllPlaylistsong, findOnePlaylistsong, updatePlaylistsong, removePlaylistsong}