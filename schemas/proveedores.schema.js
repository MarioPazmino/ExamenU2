//schemas/proveedores.schema.js


const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(255);
const RUC = Joi.number().integer();
const direccion = Joi.string().min(5);
const estado = Joi.boolean();

const createProveedorSchema = Joi.object({
  name: name.required(),
  RUC: RUC.required(),
  direccion: direccion.required(),
  estado: estado.optional()
});

const updateProveedorSchema = Joi.object({
  name: name.optional(),
  RUC: RUC.optional(),
  direccion: direccion.optional(),
  estado: estado.optional()
});

const getProveedorSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createProveedorSchema,
  updateProveedorSchema,
  getProveedorSchema
};