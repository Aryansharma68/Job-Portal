import "./polyfill.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import dns from "dns";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import fs from "fs";

// Ensure Atlas SRV records resolve smoothly on Windows
dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, true); // Allow during transition or fallback
        }
    },
    credentials: true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Serve frontend static assets for Single Page Application (SPA)
const __dirname = path.resolve();
const possibleDistPaths = [
    path.join(__dirname, "../frontend/dist"),
    path.join(__dirname, "frontend/dist"),
    path.join(__dirname, "../dist"),
    path.join(__dirname, "dist"),
];
const frontendDist = possibleDistPaths.find(p => fs.existsSync(p));

if (frontendDist) {
    console.log(`Serving frontend static files from: ${frontendDist}`);
    app.use(express.static(frontendDist));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(frontendDist, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.status(200).json({
            message: "Job Portal Backend API is running. (Frontend dist not built)",
            status: "UP"
        });
    });
}

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})