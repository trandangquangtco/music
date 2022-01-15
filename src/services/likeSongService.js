const LikeSong = require('../models/likeSongModel')

const { response } = require('../helpers/response')

const addLikeSong = async (body) => {
  try {
    const create = await LikeSong.create(body)
    return response('success', create)
  } catch (error) {
    throw error
  }
}

const findAllLikeSong = async (body, limit, page) => {
  try {
    const findAll = await LikeSong.findAll({
      where: body,
      limit: limit,
      offset: (limit * (page - 1))
    })
    return response('success', findAll)
  } catch (error) {
    throw error
  }
}

const findOneLikeSong = async (body) => {
  try {
    const findOne = await LikeSong.findOne({
      where: body
    })
    return response('success', findOne)
  } catch (error) {
    throw error
  }
}

const updateLikeSong = async (id, body) => {
  try {
    const update = await LikeSong.update(body, {
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

const removeLikeSong = async (body) => {
  try {
    const remove = await LikeSong.destroy({
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

module.exports = { addLikeSong, findAllLikeSong, findOneLikeSong, updateLikeSong, removeLikeSong}