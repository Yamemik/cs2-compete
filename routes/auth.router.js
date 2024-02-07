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
 *   summary: "Отследить переход на платформу после авторизации в Steam"
 *   tags:
 *     - Авторизация
 *   responses:
 *     200:
 *      description: Успешно
 */
router
	.get("/auth/steam", passport.authenticate("steam", { session: false }))
	.get("/auth/steam/return", passport.authenticate("steam", { session: false }), authController.GET);

export default router;
