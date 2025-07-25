import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import adminRouter from "./routes/adminRoutes.js";

// Initialize Express App
const app = express();

// Connect DB

await connectDB()

// Middleware

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send("server is running"));
app.use('/api/user', userRouter);
app.use('/api/admin', adminRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))