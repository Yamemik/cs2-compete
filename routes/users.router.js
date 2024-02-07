import { Router } from "express";
import { usersController } from "../controllers/users.controller.js";

const router = Router();

/**
 * @swagger
 * /users:
 *  get:
 *   summary: "Получить всех пользователей"
 *   tags:
 *     - Пользователи
 * /user/{id}:
 *  get:
 *   summary: "Получить пользователя по ID"
 *   tags:
 *     - Пользователи
 *  delete:
 *   summary: "Удалить пользователя по ID"
 *   tags:
 *     - Пользователи
 */
router.route("/users").get(usersController.GET);
router.route("/user/:id").get(usersController.GET_BY_ID).delete(usersController.DELETE);

export default router;
