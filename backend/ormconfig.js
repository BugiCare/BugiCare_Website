const SnakeNamingStrategy = require("typeorm-naming-strategies").SnakeNamingStrategy

module.exports = {
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "cys",
  "password": "1234",
  "database": "cysDB",
  "synchronize": true,
  "logging": false,
  "entities": [
    "src/entity/**/*.ts"
  ],
  "migrations": [
    "src/migration/**/*.ts"
  ],
  "subscribers": [
    "src/subscriber/**/*.ts"
  ],
  namingStrategy: new SnakeNamingStrategy()
}