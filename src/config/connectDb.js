let Sequelize = require('sequelize');

let sequelize = new Sequelize('grafsound', 'grafsound', 'g32*9hhaW99', {
  host: '127.0.0.1',
  dialect: 'mysql'
});

module.exports = sequelize;