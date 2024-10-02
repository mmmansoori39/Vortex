import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors'


import connectDb from './db/connectDb.js';

// importing routes
import authRoute from "./routes/authRoute.js"
import blogRoute from "./routes/blogRoutes.js"
import challengeRoute from "./routes/challengeRoute.js"

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);
app.use("/api/challenge", challengeRoute); 


app.get("/", (req, res) => {
    res.send("Hello MMM 123.....")
})

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT} `)
});