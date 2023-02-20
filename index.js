const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { connection } = require("./config/db");
const { postRouter } = require("./routes/postRoutes");
const { userRouter } = require("./routes/userRoutes");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("home");
});

app.use("/users", userRouter);
app.use("/post", postRouter);
app.listen(process.env.port, async () => {
  try {
    await connection;
  } catch (err) {
    res.send("err");
  }
  console.log(`running server at ${process.env.port}`);
});
