import express from "express";
import { Login, RegisterUser } from "../controllers/AuthControllers.js";

const router = express.Router();

router.post("/register", RegisterUser);

router.post("/login", Login)


export default router;



