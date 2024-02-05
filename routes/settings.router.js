import { Router } from "express";

import { settingController } from "../controllers/settings.controller.js";

const router = Router();

/**
 * @swagger
 * /settings:
 *  get:
 *   summary: "Получить настройки"
 *   tags:
 *     - Настройки
 *   responses:
 *     200:
 *        description: Успешно
 *  patch:
 *   summary: "Изменить настройки"
 *   tags:
 *    - Настройки
 *   responses:
 *     200:
 *        description: Успешно
 *   parameters:
 *     - in: body
 *       name: settings
 *       schema:
 *          type: object
 *          properties:
 *             rules:
 *               type: string
 *             faq:
 *               type: string
 *             contacts:
 *               type: array
 *               items:
 *                 type: object
 *             advertising_banners:
 *               type: array
 *               items:
 *                 type: string
 */
router.route("/settings").get(settingController.GET).patch(settingController.PATCH);

export default router;
