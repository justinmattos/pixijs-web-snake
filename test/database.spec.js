const db = require('../server/db/db');

beforeAll(() => {
  return db.sync({ force: true });
});
afterAll(() => {
  return db.close();
});
describe('Model Tests', () => {
  require('./Database/models.spec');
});
