//services/proveedores.service.js



const boom = require('boom');
const pool = require('../libs/postgres.pool');

class ProveedoresService {
  constructor() {
    this.pool = pool;
  }

  async create(data) {
    try {
      const query = 'INSERT INTO proveedores (name, RUC, direccion, estado) VALUES ($1, $2, $3, $4) RETURNING *';
      const values = [data.name, data.RUC, data.direccion, data.estado || true];
      const result = await this.pool.query(query, values);
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { 
        throw boom.conflict('RUC ya existe');
      }
      throw boom.internal(error);
    }
  }

  async find() {
    const query = 'SELECT * FROM proveedores WHERE estado = true';
    const result = await this.pool.query(query);
    return result.rows;
  }



  async findOne(id) {
    const query = 'SELECT * FROM proveedores WHERE id = $1 AND estado = true';
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) {
      throw boom.notFound('Proveedor no encontrado');
    }
    return result.rows[0];
  }

  async update(id, changes) {
    try {
      const query = 'UPDATE proveedores SET name = COALESCE($1, name), RUC = COALESCE($2, RUC), direccion = COALESCE($3, direccion), estado = COALESCE($4, estado) WHERE id = $5 RETURNING *';
      const values = [
        changes.name, 
        changes.RUC, 
        changes.direccion, 
        changes.estado, 
        id
      ];
      const result = await this.pool.query(query, values);
      if (result.rows.length === 0) {
        throw boom.notFound('Proveedor no encontrado');
      }
      return result.rows[0];
    } catch (error) {
      if (error.code === '23505') { // Unique constraint violation
        throw boom.conflict('RUC ya existe');
      }
      throw boom.internal(error);
    }
  }

  async delete(id) {
    try {
      const query = 'DELETE FROM proveedores WHERE id = $1 RETURNING id';
      const result = await this.pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        throw boom.notFound('Proveedor no encontrado');
      }
      
      return { id };
    } catch (error) {
      throw boom.internal(error);
    }
  }
  

}

module.exports = ProveedoresService;