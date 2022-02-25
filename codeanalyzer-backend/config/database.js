const path = require('path');

module.exports = ({ env }) => ({   
  connection: {
    client: "mysql",
    connection: {
      host: env("DEV_DATABASE_HOST", "localhost"),
      port: env("DEV_DATABASE_PORT", 3306),
      database: env("DEV_DATABASE_NAME", "ASDC_PROJECT_BHARAT"),
      user: env("DEV_DATABASE_USERNAME", "root"),
      password: env("DEV_DATABASE_PASSWORD", "password"),
    },
    useNullAsDefault: true,   
  }, 
 });