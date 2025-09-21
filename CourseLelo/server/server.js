import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/db.js';
import courseRoutes from './routes/courseRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

connectDb();

app.use('/',courseRoutes);

app.use((req,res,next)=>{
    res.status(404).json({message : "Something went Wrong!"})
})

const PORT = process.env.PORT || 8001;

app.listen(PORT,()=>{
    console.log(`Server is running on port : http://localhost:${PORT}`);
})

