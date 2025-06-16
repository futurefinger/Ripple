import express from "express";
import { getaccountbalance, getaddress, gettransaction } from "../controllers/Getbalance.js";


const router = express.Router();

router.post("/getbalance", getaccountbalance);
router.get("/getaddress", getaddress);
router.post("/gettransaction", gettransaction);

export default router;