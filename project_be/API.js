const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const toolRouter = require("./routes/toolsRouter");
const path = require("path");

const app = express();
const port = process.env.PORT || 4000;
const fs = require("fs");

const uploadDir = path.join(__dirname, "public", "toolsImages");

fs.access(uploadDir, fs.constants.W_OK, (err) => {
  if (err) {
    console.log(`No write permissions for ${uploadDir}`);
  } else {
    console.log(`Write permissions confirmed for ${uploadDir}`);
  }
});

connectDB();

app.use(cors());
app.use(express.json());
app.use("/toolsImages", express.static(path.join(__dirname, "toolsImages")));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/api/users", userRouter);
app.use("/api/tools", toolRouter);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
