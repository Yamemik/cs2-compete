import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDocument from "swagger-jsdoc";

const app = express();

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
						url: "http://localhost:9999",
						description: "Локальный сервер разработки",
					},
					{
						url: "https://compete.wtf",
						description: "Основной сервер",
					},
				],
			},
			apis: ["./app.js"],
		}),
	),
);

/**
 * @swagger
 * /settings:
 *  get:
 *   summary: "Получить настройки"
 *   tags:
 *     - Settings
 *   responses:
 *     200:
 *        description: Успешно
 */
app.get("/settings", (_, res) => res.send("Return settings"));

/**
 * @swagger
 * /settings:
 *  patch:
 *   summary: "Изменить настройки"
 *   tags:
 *     - Settings
 *   responses:
 *     200:
 *        description: Успешно
 */
app.patch("/settings", (req, res) => res.send("Change setting or settings"));

app.listen(9999, () => console.log("[SERVER STARTED]"));
