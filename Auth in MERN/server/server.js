import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Dbconnect } from "./config/db.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/",userRouter);

app.listen(process.env.PORT, () => {
  Dbconnect();
  console.log(`Server is running on port ${process.env.PORT}`);
});
