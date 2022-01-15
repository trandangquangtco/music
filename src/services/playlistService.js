//=================IMPORT====================//
const Playlist = require('../models/playlistModel')
const { response } = require('../helpers/response')

//=================CREATE====================//
const addPlaylist = async (body) => {
  try {
    const create = await Playlist.create(body)
    return response('success', create)
  } catch (error) {
    throw error
  }
}

//=================GET LIST====================//
const findAllPlaylist = async (body, limit, page) => {
  try {
    const findAll = await Playlist.findAll({
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
const findOnePlaylist = async (body) => {
  try {
    const findOne = await Playlist.findOne({
      where: body
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

//=================UPDATE====================//
const updatePlaylist = async (id, body) => {
  try {
    const update = await Playlist.update(body, {
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
const removePlaylist = async (body) => {
  try {
    const remove = await Playlist.destroy({
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

module.exports = { addPlaylist, findAllPlaylist, findOnePlaylist, updatePlaylist, removePlaylist}