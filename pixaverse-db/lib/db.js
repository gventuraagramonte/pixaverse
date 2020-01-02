'use strict'

const Sequelize = require('sequelize')
let sequelize = null
// si la instancia sequelize no existe entonces la creo, luego en la segunda pasada la instancia ya funciona entonces solo se retorna.

module.exports = function setupDatabase (config) {
  if (!sequelize) {
    sequelize = new Sequelize(config)
  }
  return sequelize
}
