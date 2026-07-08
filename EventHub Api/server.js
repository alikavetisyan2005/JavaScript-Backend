const app = require("./src/app");

const connectDb= require("./src/config/db");
const {port} = require("./src/config/env");

 
async function start() {
  await connectDb();
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
}
 
start();