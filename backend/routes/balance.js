import express from "express";
import { getaccountbalance, getaddress } from "../controllers/Getbalance.js";


const router = express.Router();

router.post("/getbalance", getaccountbalance);
router.get("/getaddress", getaddress);

export default router;