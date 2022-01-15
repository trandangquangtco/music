const Playlistadminsong = require('../models/playlistadminsongModel')
const { response } = require('../helpers/response')

const addPlaylistadminsong = async (body) => {
  try {
    const create = await Playlistadminsong.create(body)
    return response('success', create)
  } catch (error) {
    throw error
  }
}

const findAllPlaylistadminsong = async (body, limit, page) => {
  try {
    const findAll = await Playlistadminsong.findAll({
      where: body,
      limit: limit,
      offset: (limit * (page - 1))
    })
    return response('success', findAll)
  } catch (error) {
    throw error
  }
}

const findOnePlaylistadminsong = async (body) => {
  try {
    const findOne = await Playlistadminsong.findOne({
      where: body
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

const updatePlaylistadminsong = async (id, body) => {
  try {
    const update = await Playlistadminsong.update(body, {
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

const removePlaylistadminsong = async (body) => {
  try {
    const remove = await Playlistadminsong.destroy({
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

module.exports = { addPlaylistadminsong, findAllPlaylistadminsong, findOnePlaylistadminsong, updatePlaylistadminsong, removePlaylistadminsong}