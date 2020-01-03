'use strict'

const test = require('ava')

const config = {
  logging: function () {}
}
let db = null
// antes de cada uno de los test ejecute la siguiente función asyncrona
test.beforeEach(async () => {
  const setupDatabase = require('../')
  db = await setupDatabase(config)
})

test('Agent', t => {
  t.truthy(db.Agent, 'Agent service should exist') // resuelve a verdadero, no necesariamente tiene que se verdadero
})
