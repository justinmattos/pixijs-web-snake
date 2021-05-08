const app = require('../server/app.js');
const supertest = require('supertest');
const agent = supertest(app);

describe('Server', () => {
  describe('The app', () => {
    test('returns a 404 when at a bad url', (done) => {
      agent.get('/badAndShouldFail').expect(404, done);
    });
    test('returns a 200 at root', (done) => {
      agent.get('/').expect(200, done);
    });
  });
});
