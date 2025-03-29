import { authenticate } from "../config/auth.js"
import {explainController, getQueryController, homeController, validateController} from "../controllers/homeController.js"
import express from "express"

const router = express.Router()

router.post("/query", authenticate, homeController)
router.get("/queries", getQueryController)

router.post("/explain", explainController)
router.post("/validate", authenticate, validateController)


export default router