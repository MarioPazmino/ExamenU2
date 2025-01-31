const boom = require('boom');
const { faker } = require('@faker-js/faker');
/* const pool = require('../libs/postgres.pool'); */
const sequelize = require('../libs/sequelize');
class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
 
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }
  async find() {
    const query = 'SELECT * FROM tasks';
    const [data] = await sequelize.query(query);
    return data;
  }
  async findOne(id) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }
  async update(id, changes) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes,
    };
    return this.products[index];
  }

  async delete(id) {
    const query = 'UPDATE proveedores SET estado = false WHERE id = $1 RETURNING *';
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw boom.notFound('Proveedor no encontrado');
    }
    return result.rows[0];
  }
}

module.exports = ProductsService;
