import { Router } from "express";

import multer from "multer";

const router = Router();

const _multerConfig = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, "uploads");
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});
const _multer = multer({
	storage: _multerConfig,
});

/**
 * @swagger
 * /upload:
 *  post:
 *   summary: "Загрузить файл"
 *   tags:
 *     - Загрузка файлов
 *   responses:
 *     200:
 *        description: Успешно
 */
router.route("/upload").post(_multer.single("file"), (req, res) => {
	res.json({ message: "Upload file on server" });
});

export default router;
