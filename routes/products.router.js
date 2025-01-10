const express = require('express'); //Importar express
const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;

  res.json(products);
});

router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (id === '123') {
    res.status(404).json({
      message: 'Not found',
    });
  } else {
    res.status(200).json({
      id: id,
      name: 'Producto 2',
      price: 120,
    });
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'Registro creado',
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'Registro actualizado con patch',
    data: body,
    id,
  });
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

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'Registro eliminado',
    id,
  });
});

module.exports = router;
