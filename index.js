const express = require('express'); //Importar express
const app = express(); // Asignar express a mi aplicación
const port = 3000; // Asignación puerto donde se ejecutará el proy

app.get('/', (req, res) => {
  res.send('Hola servidor de express');
});
app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});
app.get('/products', (req, res) => {
  res.json({
    name: 'Producto 1',
    price: 200,
  });
});

app.listen(port, () => {
  console.log('Mi puerto' + port);
});
