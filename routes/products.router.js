const express = require('express'); //Importar express
const { faker } = require('@faker-js/faker');
const router = express.Router();

app.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.url(),
    });
  }
  res.json(products);
});

app.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

app.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    name: 'Producto 2',
    price: 120,
  });
});

module.exports = router;
