import { Router } from "express";

import { messagesController } from "../controllers/messages.controller.js";
const router = Router();

/*
 * @swagger
 * /messages:
 *  get:
 *   summary: "Получить сообщение по лобби"
 *   tags:
 *     - Чат
 *   responses:
 *     200:
 *        description: Успешно
 *  patch:
 *   summary: "Изменить сообщение"
 *  post:
 *   summary: "Создать сообщение"
 *   tags:
 *    - Чат
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
 *             metadata_user_id:
 *                type: string
 *                default: user_id
 * 
 * 
 * 
 * /messages/id:
 *  get:
 *   summary: "Получить сообщение"
 *   tags:
 *     - Чат
 *   responses:
 *     200:
 *        description: Успешно
 *   parameters:
 *     - in: body
 *       name: get_payment
 * 
 *  post:
 *   tags:
 *    - Чат
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
 *             metadata_user_id:
 *                type: string
 *                default: user_id
 * 
 *  patch:
 *   summary: "Изменить чат"
 *   tags:
 *    - Чат
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
 *             metadata_user_id:
 *                type: string
 *                default: user_id
 * 
 * 
 * 
 * /chats: 
 *  post:
 *   summary: "Создать чат"
 *   tags:
 *    - Чат
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
 */

router.route("/messages/get/:lobby_id").get(messagesController.GET_BY_LOBBY)
router.route("/messages/create/:lobby_id").post(messagesController.create)
router.route("/messages/delete/:lobby_id").post(messagesController.DELETE);

export default router;