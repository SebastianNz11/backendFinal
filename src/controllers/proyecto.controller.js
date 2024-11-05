// controllers/ProyectoController.js
import { Proyecto } from "../models/proyecto.model.js";

// Crear un nuevo proyecto
export const crearProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.create(req.body);
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};

// Obtener todos los proyectos
export const obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
};

// Obtener un proyecto por ID
export const obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      res.json(proyecto);
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
};

// Actualizar un proyecto
export const actualizarProyecto = async (req, res) => {
  try {
    const [updated] = await Proyecto.update(req.body, {
      where: { id_proyecto: req.params.id }
    });
    if (updated) {
      const proyecto = await Proyecto.findByPk(req.params.id);
      res.json(proyecto);
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
};

// Eliminar un proyecto
export const eliminarProyecto = async (req, res) => {
  try {
    const deleted = await Proyecto.destroy({
      where: { id_proyecto: req.params.id }
    });
    if (deleted) {
      res.json({ mensaje: 'Proyecto eliminado' });
    } else {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
};
