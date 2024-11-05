import { sequelize } from "../database/database.js";
import { DataTypes } from "sequelize";

export const Proyecto = sequelize.define(
  "Proyecto",
  {
    id_proyecto: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    completada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    fecha_creacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_vencimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    prioridad: {
      type: DataTypes.ENUM("baja", "media", "alta"),
      defaultValue: "media",
    },
    asignado_a: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Costo_proyecto: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    Pagado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);
