import { Router } from "express";
import passport from "passport";

import { authController } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * /auth/steam:
 *  get:
 *   summary: "Перейти на страницу аутентификации Steam"
 *   tags:
 *     - Авторизация
 *   responses:
 *     200:
 *      description: Успешно
 * /auth/steam/return:
 *  get:
 *   summary: "че это?"
 *   tags:
 *     - Авторизация
 *   responses:
 *     200:
 *      description: Успешно
 */
router
	.get("/auth/steam", passport.authenticate("steam"))
	.get("/auth/steam/return", passport.authenticate("steam"), authController.GET);

export default router;
