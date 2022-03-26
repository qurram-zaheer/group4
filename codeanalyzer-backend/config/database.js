const path = require('path');
const parse = require('pg-connection-string').parse;
const config = parse(process.env.DATABASE_URL)


// module.exports = ({env}) => ({
//   connection: {
//     client: "postgres",
//     connection: {
//       host: env("DATABASE_HOST", "localhost"),
//       port: env("DATABASE_PORT", 3306),
//       database: env("DATABASE_NAME", "ASDC_PROJECT"),
//       user: env("DATABASE_USERNAME", "root"),
//       password: env("DATABASE_PASSWORD", "password"),
//     },
//     useNullAsDefault: true,
//   },
// });

module.exports = ({env}) => ({
  connection: {
    client: "postgres",
    connection: {
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.user,
      password: config.password,
      ssl: {
        rejectUnauthorized: false
      },
    },
    debug: false
  }
})
