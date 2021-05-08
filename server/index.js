const app = require('./app.js');
const PORT = process.env.PORT || 3000;

const { db } = require('./db/index');

db.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`App Listening on PORT: ${PORT}`));
});
