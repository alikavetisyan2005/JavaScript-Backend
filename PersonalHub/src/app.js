const express = require("express")
const cookieParser = require("cookie-parser")

const routes = require("./routes")

const notFoundMiddleware = require("./middlewares/notFound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);


app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = app;
