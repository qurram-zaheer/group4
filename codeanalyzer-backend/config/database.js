const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: "mysql",
    connection: {
      host: env("DATABASE_HOST", "localhost"),
      port: env("DATABASE_PORT", 3306),
      database: env("DATABASE_NAME", "ASDC_PROJECT"),
      user: env("DATABASE_USERNAME", "root"),
      password: env("DATABASE_PASSWORD", "password"),
    },
    useNullAsDefault: true,
  },
 });
