import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDocument from "swagger-jsdoc";

const app = express();
const router = express.Router();

app.use(
	"/swagger",
	swaggerUI.serve,
	swaggerUI.setup(
		swaggerJSDocument({
			definition: {
				openapi: "3.0.0",
				info: {
					title: "COMPETE",
					version: "1.0.0",
				},
				servers: [
					{
						url: "http://localhost:9999/api/",
						description: "API для разработки",
					},
					{
						url: "https://compete.wtf/api/",
						description: "API для продакшена",
					},
				],
			},
			apis: ["./app.js"],
		}),
	),
);

app.use("/api", router);

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
 */
router.route("/settings")
	.get((_, res) => res.send("Return settings"))
	.patch((req, res) => res.send("Change setting or settings"));

app.listen(9999, () => console.log("[SERVER STARTED]"));
