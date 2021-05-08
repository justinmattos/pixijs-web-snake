const db = require('../server/db/db');

beforeAll(() => {
  return db.sync({ force: true });
});
afterAll(() => {
  return db.close();
});
describe('Model Tests', () => {
  require('./Database/Users.spec');
  require('./Database/Scores.spec');
});
