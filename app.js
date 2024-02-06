import express from "express";
import swaggerUI from "swagger-ui-express";
import swaggerJSDocument from "swagger-jsdoc";
import mongoose from "mongoose";
import { createTunnel } from "tunnel-ssh";
import { configDotenv } from "dotenv";
import passport from "passport";
import SteamStrategy from "passport-steam";

import settingsRouter from "./routes/settings.router.js";
import uploadRouter from "./routes/upload.router.js";
import paymentRouter from "./routes/payment.router.js"
import authRouter from "./routes/auth.router.js";

configDotenv();

const app = express();

app.use(express.json());

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
         apis: ["./routes/*.js"],
      }),
   ),
);

app.use("/api", settingsRouter, uploadRouter, paymentRouter, authRouter);

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
            "mongodb://127.0.0.1:27017/site?serverSelectionTimeoutMS=2000&appName=mongosh+2.1.3&directConnection=true&tls=false",
         )
         .then(_ => console.log("[DATABASE OK]"))
         .catch(_ => console.log("[DATABASE ERROR]"));
   }
});

passport.use(
	new SteamStrategy(
		{
			returnURL: "http://localhost:9999/api/auth/steam/return",
			realm: "http://localhost:9999/",
			apiKey: process.env.STEAM_API_KEY,
		},
		// функция ниже выполняется, если юзер нажал "Войти" и успешно вошел на странице Steam
		function (identifier, profile, done) {
			console.log({ identifier, profile, done });
			/* User.findByOpenID({ openId: identifier }, function (err, user) {
				return done(err, user);
			}); */
		},
	),
);

app.listen(9999, () => console.log("[SERVER OK]"));
