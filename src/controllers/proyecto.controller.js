// controllers/ProyectoController.js
import { Proyecto } from "../models/proyecto.model.js";
import Stripe from "stripe";

// Crear un nuevo proyecto
export const crearProyecto = async (req, res) => {
  try {
    const proyecto = await Proyecto.create(req.body);
    res.status(201).json(proyecto);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el proyecto" });
  }
};

// Obtener todos los proyectos
export const obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los proyectos" });
  }
};

// Obtener un proyecto por ID
export const obtenerProyectoPorId = async (req, res) => {
  try {
    const proyecto = await Proyecto.findByPk(req.params.id);
    if (proyecto) {
      res.json(proyecto);
    } else {
      res.status(404).json({ error: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el proyecto" });
  }
};

// Actualizar un proyecto
export const actualizarProyecto = async (req, res) => {
  try {
    const { id_proyecto } = req.params;
    const [updated] = await Proyecto.update(req.body, {
      where: { id_proyecto },
    });
    if (updated) {
      const proyecto = await Proyecto.findByPk(req.params.id);
      res.json(proyecto);
    } else {
      res.status(404).json({ error: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el proyecto" });
  }
};

// Eliminar un proyecto
export const eliminarProyecto = async (req, res) => {
  try {
    const { id_proyecto } = req.params;
    const deleted = await Proyecto.destroy({
      where: { id_proyecto },
    });
    if (deleted) {
      res.json({ mensaje: "Proyecto eliminado" });
    } else {
      res.status(404).json({ error: "Proyecto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};







const stripe = new Stripe(
  "sk_test_51Pi7zEHLX4cxCWgz6PugdVFd5P34a4GYI3HDdExbT4kdPJPPwxfjuH5UeBuq9LzqvqFMIVXsDF2yPugwZgt0ox6R00mrLP1lnI"
);

export const realizarPago = async (req, res) => {
  const { id_proyecto } = req.body;

  try {
    const proyecto = await Proyecto.findByPk(id_proyecto);
    if (!proyecto) {
      return res.status(404).send("Proyecto no encontrado");
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            product_data: {
              name: proyecto.titulo,
              description: proyecto.descripcion || "Pago del proyecto",
            },
            currency: "usd",
            unit_amount: Math.round(proyecto.Costo_proyecto * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
    });

    return res.json({ id: session.id });
  } catch (error) {
    console.error("Error al crear la sesión de pago:", error);
    return res.status(500).send(error.message);
  }
};

export const success = (req, res) => {
  res.send("Su pago fue realizado con éxito, puede cerrar la ventana");
};

export const cancel = (req, res) => {
  res.send("Su pago fue cancelado, puede cerrar la ventana");
};
