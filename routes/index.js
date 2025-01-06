const productsRouter = require('./products.router');
const usersRouter = require('./users.router');
function routerApi(app) {
  app.use('/products', productsRouter);
  /* app.use('/users', usersRouter);
  app.use('/categories', categoriesRouter); */
}
module.exports = routerApi();
