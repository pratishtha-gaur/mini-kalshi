import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

import authRouter from "./routes/authRouter";
import marketRouter from "./routes/marketRouter";
import resolveRouter from "./routes/resolveRouter";

const app = express();

app.use(express.json());

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/market", marketRouter);
app.use("/api/v1/resolve", resolveRouter);

async function main() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("mongoDB connected");

  app.listen(process.env.PORT, () => {
    console.log("server running on port 3000");
  });
}

main().catch(console.error);
