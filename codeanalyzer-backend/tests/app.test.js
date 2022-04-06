const { doesNotMatch } = require("assert");
const fs = require("fs");
const { setupStrapi } = require("./helpers/strapi");

jest.setTimeout(30000);

beforeAll(async () => {
  await setupStrapi();
});

afterAll(async () => {
  const dbSettings = strapi.config.get("database.connection.connection");

  //close server to release the db-file
  await strapi.server.destroy();

  //DATABASE_FILENAME=.tmp/test.db

  //delete test database after all tests
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = `${dbSettings.filename}`;

    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  await new Promise(resolve => setTimeout(() => resolve(), 500));
});

/**
 * @author Bharatwaaj Shankar
 * @description Creates a User and Checks if the API is returning the new user created by logging in
 * @name TEST001
 */
it('strapi is defined', () => {
  expect(strapi).toBeDefined();
});

require('./user');
require('./github');
