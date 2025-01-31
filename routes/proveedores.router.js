//routes/proveedores.router.js

const express = require('express');
const ProveedoresService = require('../services/proveedores.service');
const validatorHandler = require('../middlewares/validator.handler');
const { 
  createProveedorSchema, 
  updateProveedorSchema, 
  getProveedorSchema 
} = require('../schemas/proveedores.schema');

const router = express.Router();
const service = new ProveedoresService();

// Obtener todos los proveedores
router.get('/', async (req, res, next) => {
  try {
    const proveedores = await service.find();
    res.json(proveedores);
  } catch (error) {
    next(error);
  }
});

// Obtener un proveedor por ID
router.get('/:id', 
  validatorHandler(getProveedorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const proveedor = await service.findOne(id);
      res.json(proveedor);
    } catch (error) {
      next(error);
    }
  }
);

// Crear un nuevo proveedor
router.post('/', 
  validatorHandler(createProveedorSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProveedor = await service.create(body);
      res.status(201).json(newProveedor);
    } catch (error) {
      next(error);
    }
  }
);

// Actualizar un proveedor (parcialmente)
router.patch('/:id', 
  validatorHandler(getProveedorSchema, 'params'),
  validatorHandler(updateProveedorSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const proveedor = await service.update(id, body);
      res.json(proveedor);
    } catch (error) {
      next(error);
    }
  }
);

// Eliminar (soft delete) un proveedor
router.delete('/:id', 
  validatorHandler(getProveedorSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(200).json({ id, message: 'Proveedor eliminado' });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;