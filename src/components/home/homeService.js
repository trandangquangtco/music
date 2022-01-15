const Song = require('../../models/songModel')
const { response } = require('../../helpers/response')

const orderByService = async (order, body, limit, page) => {
  try {
    const read = await Song.findAndCountAll({
      where: body,
      order: [
        [order, 'DESC']
      ],
      limit,
      offset: (limit * (page - 1))
    })
    return response('success', read, 'OK', 200)
  } catch (error) {
    throw error
  }
}

module.exports = { orderByService }
