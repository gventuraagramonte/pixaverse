# Pixaverse-db

## Usage

``` js
const setupDatabase = require('pixaverse-db')

setupDatabase(config).then(db => {
    const { Agent, Metric } = db
    // const Agent = db.Agent
    // const Metric = db.Metric
}).catch(err => console.error(err))
```

## Install

- npm i --save-dev standard
- npm i sequelize pg pg-hstore --save