'use strict'

const debug = require('debug')('pixaverse:db:setup')
const inquirer = require('inquirer')
const chalk = require('chalk')
const db = require('./')

const prompt = inquirer.createPromptModule()

async function setup () {
  //Aqui vamos a preguntar en el prompt de la consola si queremos borrar la base de datos
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?'
    }
  ])

  if(!answer.setup){
    return console.log('Nothing happened !')
  }

  const config = {
    database: process.env.DB_NAME || 'pixaverse',
    username: process.env.DB_USER || 'pixa',
    password: process.env.DB_PASS || 'pixa',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  
  await db(config).catch(handleFatalError)

  console.log('Success!')
  process.exit(0)
}

function handleFatalError (err) {
  console.error(err.message)
  console.error(err.stack)
  process.exit(1)
}

setup()
