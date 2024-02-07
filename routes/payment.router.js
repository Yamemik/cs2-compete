import { Router } from "express";

import { paymentController } from "../controllers/payment.controller.js";
const router = Router();

/*
 * @swagger
 * /payments/getByUser:
 *  get:
 *   summary: "Получить платёжи юзера"
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
 *    - Финансы
 *   responses:
 *     200:
 *        description: Успешно
 *   parameters:
 *     - in: body
 *       name: payment
 *       schema:
 *          properties:
 *             amount_value:
 *               type: number
 *               default: 1
 *             confirmation_type:
 *                type: string
 *                default: redirect
 *             confirmation_return_url:
 *                type: string
 *                default: https://cs2-compete.onrender.com/swagger
 *             description:
 *                type: string
 *                default: заказ #1
 *             metadata_user_id:
 *                type: string
 *                default: user_id
 * 
 * 
 * 
 * /payments/id:
 *  get:
 *   summary: "Получить платёж по ид"
 *   tags:
 *     - Платежи
 *   responses:
 *     200:
 *        description: Успешно
 *   parameters:
 *     - in: body
 *       name: get_payment
 * 
 *  post:
 *   summary: "Создать возврат платежа"
 *   tags:
 *    - Платежи
 *   responses:
 *     200:
 *        description: Успешно
 *   parameters:
 *     - in: body
 *       name: payment
 *       schema:
 *          properties:
 *             amount_value:
 *               type: number
 *               default: 1
 *             confirmation_type:
 *                type: string
 *                default: redirect
 *             confirmation_return_url:
 *                type: string
 *                default: https://cs2-compete.onrender.com/swagger
 *             description:
 *                type: string
 *                default: заказ #1
 *             metadata_user_id:
 *                type: string
 *                default: user_id
 * 
 *  patch:
 *   summary: "Создать отмену платежа"
 *   tags:
 *    - Платежи
 *   responses:
 *     200:
 *        description: Успешно
 *   parameters:
 *     - in: body
 *       name: payment
 *       schema:
 *          properties:
 *             amount_value:
 *               type: number
 *               default: 1
 *             confirmation_type:
 *                type: string
 *                default: redirect
 *             confirmation_return_url:
 *                type: string
 *                default: https://cs2-compete.onrender.com/swagger
 *             description:
 *                type: string
 *                default: заказ #1
 *             metadata_user_id:
 *                type: string
 *                default: user_id
 * 
 * 
 * 
 * /payouts: 
 *  post:
 *   summary: "Создать платёж"
 *   tags:
 *    - Возвраты
 *   responses:
 *     200:
 *        description: Успешно
 *   parameters:
 *     - in: body
 *       name: payout
 *       schema:
 *          properties:
 *             amount_value:
 *               type: number
 *               default: 1
 *             confirmation_type:
 *                type: string
 *                default: redirect
 *             confirmation_return_url:
 *                type: string
 *                default: https://cs2-compete.onrender.com/swagger
 *             description:
 *                type: string
 *                default: заказ #1
 *             metadata_user_id:
 *                type: string
 *                default: user_id
 */

router.route("/payments/get/:payment_id").get(paymentController.GET_BY_ID)
router.route("/payments/createCancel/:payment_id").post(paymentController.POST_CANCEL)
router.route("/payments/createRefund/:payment_id").post(paymentController.POST_CREATE_REFUND);
router.route("/payments/getByUser").post(paymentController.GET_BY_USER);
router.route("/payments/createPayment").post(paymentController.POST_CREATE);
router.route("/payouts/createPayout").post(paymentController.POST_CREATE_PAYOUT);

export default router;