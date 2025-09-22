import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import path from "path";
import { connectDB } from "./lib/db.js";
import { ENV } from "./lib/env.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const __dirname = path.resolve(); 

const PORT = ENV.PORT|| 3000;
app.use(cookieParser());

app.use(express.json())
app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

if (ENV.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    connectDB();
});
