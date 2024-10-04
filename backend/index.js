import express from 'express';
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url'; // Needed to work with import.meta.url

import connectDb from './db/connectDb.js';

// importing routes
import authRoute from "./routes/authRoute.js";
import blogRoute from "./routes/blogRoutes.js";
import challengeRoute from "./routes/challengeRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Convert import.meta.url to file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// Serve static files from the frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);
app.use("/api/challenge", challengeRoute); 

// Fallback for any other routes, serve the frontend
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.get("/", (req, res) => {
    res.send("Hello MMM 123.....");
});

app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
});
