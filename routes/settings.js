import { Router } from "express";

import settingsModel from "./../models/settings.js";

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
router
	.route("/settings")
	.get(async (_, res) => {
		const settings = await settingsModel.find({});
		res.json(settings);
	})
	.patch(async (req, res) => {
		const settings = await settingsModel.updateMany(
			{},
			{
				$set: req.body,
			},
			{ upsert: true },
		);
		res.json(settings);
	});

export default router;