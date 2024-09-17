const express = require("express");
const connectDB = require("./config/db");
const app = express();
const userRouter = require("./routes/userRouter");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");
connectDB();

// Middleware
app.use(express.json());
app.use(requestLogger);
app.get("/", (req, res) => res.send("API Running!"));

// ROUTES

app.use("/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);
// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
const express = require("express");
const connectDB = require("./config/db.js");
const toolRouter = require("./routes/toolsRouter.js");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./middleware/middleware.js");
const app = express();

connectDB();

// middleware
app.use(express.json());
app.use(requestLogger);
app.get("/", (req, res) => res.send("API Running!"));

// routes
app.use("/api/tools", toolRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
