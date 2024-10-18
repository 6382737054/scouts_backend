import express from "express";
import router from "./routes/route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", router);

export default app;