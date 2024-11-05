import express from "express";
import { sequelize } from "./database/database.js";
import "dotenv/config";
import cors from 'cors';

import morgan from "morgan";
import routesProyecto from "./routes/proyecto.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(routesProyecto);
app.use(
  cors({
    origin: ["https://backendfinal-3.onrender.com/proyecto"],
    methods: ["GET", "PATCH", "POST", "DELETE", "PUT"],
  })
);
const main = () => {
  app.listen(process.env.PORT, async () => {
    try {
      await sequelize.sync();
      console.log("La conexión se realizó de manera correcta");
      console.log("Escuchando en el puerto " + process.env.PORT || 4001);
    } catch (error) {
      console.error("No se pudo conectar la base de datos:", error);
    }
  });
};

main();
