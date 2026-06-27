const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const routes = require("./routes")
const errorHanlder = require("./middleware/error/error.middleware")


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  return res.json({ message: "Api is running" });
});

app.use("/api", routes);

app.use(errorHanlder)

app.listen(process.env.PORT, () => {
  console.log(`Server is runnig on Port ${process.env.PORT}`);
});
