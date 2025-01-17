const express = require('express'); //Importar express
const ProductsService = require('./../services/products.service'); //Importar el servicio de productos
const router = express.Router();
const service = new ProductsService(); //Instanciar el servicio de productos

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Registro actualizado con put',
    data: body,
    id,
  });
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = router;
