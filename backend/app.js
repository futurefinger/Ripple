import express from "express";
import cors from "cors";
import balanceroute from "./routes/balance.js"

const app = express();


app.use(express.json());
app.use(cors({
    origin: "http://localhost:3001"
}))

app.use("/api/v1/ripple", balanceroute);

export default app;