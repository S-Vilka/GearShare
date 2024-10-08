const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const toolRouter = require("./routes/toolsRouter");
const path = require("path");
const {
  requestLogger,
  unknownEndpoint,
  errorHandler,
} = require("./middleware/customMiddleware");

const app = express();
const port = process.env.PORT || 4000;
const fs = require("fs");
const uploadDirTools = path.join(__dirname, "public", "toolsImages");
const uploadDirProfile = path.join(__dirname, "public", "profileImages");

// Check if the directory exists and has write permissions
fs.access(uploadDirProfile, fs.constants.W_OK, (err) => {
  if (err) {
    console.log(`No write permissions for ${uploadDirProfile}`);
  } else {
    console.log(`Write permissions confirmed for ${uploadDirProfile}`);
  }
});

fs.access(uploadDirTools, fs.constants.W_OK, (err) => {
  if (err) {
    console.log(`No write permissions for ${uploadDirTools}`);
  } else {
    console.log(`Write permissions confirmed for ${uploadDirTools}`);
  }
});

connectDB();

app.use(cors());
app.use(express.json());
app.use("/toolsImages", express.static(path.join(__dirname, "toolsImages")));
app.use(
  "/profileImages",
  express.static(path.join(__dirname, "profileImages"))
);
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/users", userRouter);
app.use("/api/tools", toolRouter);

// Error handling
app.use(unknownEndpoint);
app.use(errorHandler);
app.use(requestLogger);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
