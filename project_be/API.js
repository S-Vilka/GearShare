const express = require("express");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRouter");
const toolRouter = require("./routes/toolsRouter");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");

const app = express();
const port = process.env.PORT || 4000;

connectDB();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.get("/", (req, res) => res.send("API Running!"));
app.use("/api/users", userRouter);
app.use("/api/tools", toolRouter);

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);

// Start the server
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
