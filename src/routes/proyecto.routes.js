import { Router } from "express";
import {
  crearProyecto,
  obtenerProyectos,
  obtenerProyectoPorId,
  actualizarProyecto,
  eliminarProyecto,
} from "../controllers/proyecto.controller.js";

const router = Router();

router.post("/proyecto", crearProyecto);

router.get("/proyecto", obtenerProyectos);

router.get("/proyecto/:id_proyecto", obtenerProyectoPorId);

router.put("/proyecto/:id_proyecto", actualizarProyecto);

router.delete("/proyecto/:id_proyecto", eliminarProyecto);

export default router;
