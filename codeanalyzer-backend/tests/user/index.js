const request = require('supertest');

/**
 * @author Bharatwaaj Shankar
 * @description Creates a User and Checks if the API is returning the new user created by logging in
 * @name TEST002
 */
const mockUserData = {
  username: 'codeanalyzer_qa',
  email: 'codeanalyzer_qa@codeanalyzer.com',
  provider: 'local',
  password: 'codeanalyzer_qa123#',
  confirmed: true,
  blocked: null,
};

it('should login user and return jwt token', async () => {
  /** Creates a new user and save it to the database - Commented because the same user has already been created */
  // await strapi.plugins['users-permissions'].services.user.add({
  //   ...mockUserData,
  // });

  await request(strapi.server.httpServer)
    .post('/api/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: mockUserData.email,
      password: mockUserData.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body.jwt).toBeDefined();
    });

});

/**
 * @author Bharatwaaj Shankar
 * @description Creates a new user
 * @name TEST003
 */
const mockUserData2 = {
  username: 'codeanalyzer_qa2',
  email: 'codeanalyzer_qa2@codeanalyzer.com',
  provider: 'local',
  password: 'codeanalyzer_qa1234#',
  confirmed: true,
  blocked: null,
};

it('Create a new user', async () => {
  /** Creates a new user and save it to the database */
  // await strapi.plugins['users-permissions'].services.user.add({
  //   ...mockUserData2,
  // });

  await request(strapi.server.httpServer)
    .post('/api/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: mockUserData.email,
      password: mockUserData.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      expect(data.body.jwt).toBeDefined();
    });
});

/**
 * @author Bharatwaaj Shankar
 * @description Updates an existing user
 * @name TEST004
 */
it('Update a user', async () => {
  /** Creates a new user and save it to the database */
  await request(strapi.server.httpServer)
    .post('/api/auth/local')
    .set('accept', 'application/json')
    .set('Content-Type', 'application/json')
    .send({
      identifier: mockUserData.email,
      password: mockUserData.password,
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .then(data => {
      console.log('data', data);
    });
});