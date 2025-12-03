import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import pollRouter from "./router/poll.router.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", pollRouter);

const main = async () => {
  await connectDB();
  app.listen(8001, () => {
    console.log(`Server is listening to PORT : http://localhost:8001`);
  });
};

main();
