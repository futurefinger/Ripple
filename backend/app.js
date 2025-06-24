import express from "express";
import cors from "cors";
import balanceroute from "./routes/balance.js"
import userrouter from "./routes/userroutes.js"
import dotenv from "dotenv"
import { dbconnection } from "./database/dbconnection.js";

const app = express();

dotenv.config({path: "./config/config.env"})

app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL
}))

dbconnection();

app.use("/api/v1/ripple", balanceroute);
app.use("/api/v1/user", userrouter);

export default app;