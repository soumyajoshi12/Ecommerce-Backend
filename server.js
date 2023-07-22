const app = require("./app");

const dotenv = require("dotenv");
const { dataBaseConnection } = require("./config/database");

dotenv.config({ path: "./config/config.env" });

//data connection
dataBaseConnection();

app.listen(process.env.PORT, () => {
  console.log(`server is working on PORT ${process.env.PORT}`);
});
