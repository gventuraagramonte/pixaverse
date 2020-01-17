'use strict'

const test = require('ava')
const sinon = require('sinon')
const proxyquire = require('proxyquire')

const config = {
  logging: function () {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}

let AgentStub =null
let db = null
let sandbox = null
// antes de cada uno de los test ejecute la siguiente función asyncrona
test.beforeEach(async () => {
  sandbox = sinon.createSandbox()
  AgentStub = {
    hasMany: sandbox.spy()
  }

  const setupDatabase = proxyquire('../',{
    './models/agent': () => AgentStub,
    './models/metric': () => MetricStub
  })

  db = await setupDatabase(config)
})

test.afterEach(() =>{
  sandbox && sinon.resetHistory()
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist') // resuelve a verdadero, no necesariamente tiene que se verdadero
})

test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the MetricModel')
  t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument needs to be the AgentModel')
})
