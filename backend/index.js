import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url"; // Needed to work with import.meta.url

import connectDb from "./db/connectDb.js";

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

const allowedOrigins = [
  "http://localhost:5173",
  "https://ciphervortex.site",
  "https://ciphervortex.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        process.env.NODE_ENV === "development" ||
        allowedOrigins.indexOf(origin) !== -1
      ) {
        callback(null, true); // Allow requests without origin (like Postman) or from allowed origins
      } else {
        console.error(`Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Redirect HTTP to HTTPS in production
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// API Routes
app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);
app.use("/api/challenge", challengeRoute);

// Fallback to serve the frontend for any undefined routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Start the server
app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running on port ${PORT}`);
});
