import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDocument from "swagger-jsdoc";
import mongoose from "mongoose";
import { createTunnel } from "tunnel-ssh";

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

createTunnel(
	{},
	{
		port: 27017,
	},
	{
		host: "83.147.246.28",
		port: 22,
		username: "root",
		password: "cAPbb@L+@k94,G",
	},
	{
		srcAddr: "127.0.0.1",
		srcPort: 27017,
		dstAddr: "127.0.0.1",
		dstPort: 27017,
	},
).then(([_, __], error) => {
	if (error) {
		console.log("[SSH TUNNEL ERROR]");
	} else {
		mongoose
			.connect(
				"mongodb://127.0.0.1:27017/?serverSelectionTimeoutMS=2000&appName=mongosh+2.1.3&directConnection=true&tls=false",
			)
			.then(_ => console.log("[DATABASE OK]"))
			.catch(_ => console.log("[DATABASE ERROR]"));
	}
});

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
router
	.route("/settings")
	.get((_, res) => res.send("Return settings"))
	.patch((req, res) => res.send("Change setting or settings"));

app.listen(9999, () => console.log("[SERVER OK]"));
