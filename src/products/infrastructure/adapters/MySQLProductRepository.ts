import { IProductRepository } from '../../domain/IProductRepository';
import { Product, Especificacion } from '../../domain/entities/Product';
import { ProductRequest, ProductUpdateRequest } from '../../domain/dto/ProductRequest';
import pool from '../../../core/config/conn';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class MySQLProductRepository implements IProductRepository {
  async createProduct(data: ProductRequest): Promise<Product> {
    const query = `
      INSERT INTO productos (sku, nombre, descripcion, precio_venta, stock_actual, imagen_url, id_categoria)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.execute<ResultSetHeader>(query, [
      data.sku,
      data.nombre,
      data.descripcion || null,
      data.precio_venta,
      data.stock_actual || 0,
      data.imagen_url || null,
      data.id_categoria || null,
    ]);

    if (data.especificaciones && data.especificaciones.length > 0) {
      const specQuery = `
        INSERT INTO especificaciones (id_producto, clave, valor)
        VALUES (?, ?, ?)
      `;
      for (const spec of data.especificaciones) {
        await pool.execute(specQuery, [result.insertId, spec.clave, spec.valor]);
      }
    }

    const product = await this.getProductById(result.insertId);
    if (!product) throw new Error('Product not found after creation');
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM productos ORDER BY fecha_registro DESC'
    );

    const products: Product[] = [];
    for (const row of rows) {
      const product = await this.getProductById(row.id_producto);
      if (product) products.push(product);
    }
    return products;
  }

  async getProductById(id: number): Promise<Product | null> {
    const [productRows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM productos WHERE id_producto = ?',
      [id]
    );

    if (productRows.length === 0) return null;

    const row = productRows[0];

    const [specRows] = await pool.execute<RowDataPacket[]>(
      'SELECT id_especificacion, clave, valor FROM especificaciones WHERE id_producto = ?',
      [id]
    );

    const especificaciones: Especificacion[] = specRows.map(spec => ({
      id_especificacion: spec.id_especificacion,
      clave: spec.clave,
      valor: spec.valor,
    }));

    return {
      id_producto: row.id_producto,
      sku: row.sku,
      nombre: row.nombre,
      descripcion: row.descripcion,
      precio_venta: parseFloat(row.precio_venta),
      stock_actual: row.stock_actual,
      imagen_url: row.imagen_url,
      id_categoria: row.id_categoria,
      fecha_registro: new Date(row.fecha_registro),
      especificaciones,
    };
  }

  async updateProduct(id: number, data: ProductUpdateRequest): Promise<Product | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(data.nombre);
    }
    if (data.descripcion !== undefined) {
      fields.push('descripcion = ?');
      values.push(data.descripcion);
    }
    if (data.precio_venta !== undefined) {
      fields.push('precio_venta = ?');
      values.push(data.precio_venta);
    }
    if (data.stock_actual !== undefined) {
      fields.push('stock_actual = ?');
      values.push(data.stock_actual);
    }
    if (data.imagen_url !== undefined) {
      fields.push('imagen_url = ?');
      values.push(data.imagen_url);
    }
    if (data.id_categoria !== undefined) {
      fields.push('id_categoria = ?');
      values.push(data.id_categoria);
    }

    if (fields.length === 0) return this.getProductById(id);

    values.push(id);

    const query = `UPDATE productos SET ${fields.join(', ')} WHERE id_producto = ?`;
    await pool.execute(query, values);

    if (data.especificaciones && data.especificaciones.length > 0) {
      await pool.execute('DELETE FROM especificaciones WHERE id_producto = ?', [id]);

      const specQuery = `
        INSERT INTO especificaciones (id_producto, clave, valor)
        VALUES (?, ?, ?)
      `;
      for (const spec of data.especificaciones) {
        await pool.execute(specQuery, [id, spec.clave, spec.valor]);
      }
    }

    return this.getProductById(id);
  }

  async deleteProduct(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM productos WHERE id_producto = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  async getProductBySku(sku: string): Promise<Product | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id_producto FROM productos WHERE sku = ?',
      [sku]
    );

    if (rows.length === 0) return null;
    return this.getProductById(rows[0].id_producto);
  }

  async getProductsByCategory(id_categoria: number): Promise<Product[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT id_producto FROM productos WHERE id_categoria = ? ORDER BY fecha_registro DESC',
      [id_categoria]
    );

    const products: Product[] = [];
    for (const row of rows) {
      const product = await this.getProductById(row.id_producto);
      if (product) products.push(product);
    }
    return products;
  }
}
