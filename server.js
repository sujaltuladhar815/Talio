const app = require('./src/app.js');
const config = require('./src/config/config.js');
const dbconnection = require('./src/config/database.js');

dbconnection.connectDB();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
