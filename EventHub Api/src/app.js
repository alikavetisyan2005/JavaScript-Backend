const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const userRoutes = require("./routes/auth.routes");
const errorHandler = require("./middlewares/error.middleware");
const AppError = require("./utils/AppError");
const eventRoutes = require("./routes/event.routes");
const reviewRoutes = require("./routes/review.routes")
const attendanceRoutes = require("./routes/attedance.routes");


const app = express()
app.use(express.json())
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));


app.get('/health', (req, res) => res.json({ status: 'ok' }));
 
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api', reviewRoutes)
app.use("/api", attendanceRoutes)


app.use((req, res, next) => {
  next(new AppError(404,`Route not found`));
});

app.use(errorHandler);

module.exports = app;