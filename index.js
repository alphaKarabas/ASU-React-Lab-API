const express = require("express");
const authRouter = require("./routes/auth.routes");
const commentsRouter = require("./routes/comments.routes");
const corsMiddleware = require("./middleware/cors.middleware");
const config = require("config");
require("./databaseInitializer");

const PORT = config.get("serverPort");
const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/comments", commentsRouter);

const start = async () => {
  try {
    app.listen(PORT, () => console.log("Start " + PORT));
  } catch (e) { }
};

start();
