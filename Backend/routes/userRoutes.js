import express from "express";
import { login, register, getUserData } from "../Controllers/userControllers.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/getUserData").get(getUserData);

export default router;
