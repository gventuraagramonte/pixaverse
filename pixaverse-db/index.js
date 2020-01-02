'use strict'

const setupDatabase = require('./lib/db')
const setupAgentModel = require('./models/agent')
const setupMetricModel = require('./models/metric')

// Exportamos una funcion que contiene una configuracion
// Esta funcion sera una funcion asyncrona
module.exports = async function (config) {
  const sequelize = setupDatabase(config)
  const AgentModel = setupAgentModel(config)
  const MetricModel = setupMetricModel(config)

  // Si nos damos cuenta, cuando modelamos los datos no creamos ni el id de agente
  // ni el idagent de metricas, justamente este proceso se encarga de esta funcion
  AgentModel.hasMany(MetricModel) // El modelo de agente tiene muchas metricas
  MetricModel.belongsTo(AgentModel) // El modelo de metricas pertenece a un agente

  await sequelize.authenticate()

  const Agent = {} // dos objetos vacios (Agent y Metric)
  const Metric = {}
  // Retornamos los agentes
  return {
    Agent,
    Metric
  }
}
