import { Router } from "express";

import { paymentController } from "../controllers/payment.controller.js";
const router = Router();

/**
 * @swagger
 * /payments:
 *  get:
 *   summary: "Получить платёж"
 *   tags:
 *     - Настройки
 *   responses:
 *     200:
 *        description: Успешно
 *  patch:
 *   summary: "Изменить платёж"
 *  post:
 *   summary: "Создать платёж"
 *   tags:
 *    - Платежи
 *   responses:
 *     200:
 *        description: Успешно
 *   parameters:
 *     - in: body
 *       name: payment
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
router.route("/payments/:id").get(paymentController.GET_BY_ID).patch(paymentController.PATCH_CANCEL)
   .post(paymentController.POST_CREATE_REFUND);
router.route("/payments").get(paymentController.GET_BY_USER).post(paymentController.POST_CREATE);
router.route("/payout").post(paymentController.POST_CREATE_PAYOUT);

export default router;
