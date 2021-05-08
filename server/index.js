const app = require('./app.js');
const PORT = process.env.PORT || 4357;

app.listen(() => console.log(`App Listening on PORT: ${PORT}`));
