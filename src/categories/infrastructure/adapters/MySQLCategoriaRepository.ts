import { ICategoriaRepository } from '../../domain/ICategoriaRepository';
import { Categoria } from '../../domain/entities/Categoria';
import { CategoriaRequest, CategoriaUpdateRequest } from '../../domain/dto/CategoriaRequest';
import pool from '../../../core/config/conn';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class MySQLCategoriaRepository implements ICategoriaRepository {
  async createCategoria(data: CategoriaRequest): Promise<Categoria> {
    const query = 'INSERT INTO categorias (nombre_categoria) VALUES (?)';
    const [result] = await pool.execute<ResultSetHeader>(query, [data.nombre_categoria]);

    const categoria = await this.getCategoriaById(result.insertId);
    if (!categoria) throw new Error('Categoria not found after creation');
    return categoria;
  }

  async getAllCategorias(): Promise<Categoria[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM categorias ORDER BY nombre_categoria ASC'
    );

    return rows.map(row => ({
      id_categoria: row.id_categoria,
      nombre_categoria: row.nombre_categoria,
    }));
  }

  async getCategoriaById(id: number): Promise<Categoria | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM categorias WHERE id_categoria = ?',
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id_categoria: row.id_categoria,
      nombre_categoria: row.nombre_categoria,
    };
  }

  async updateCategoria(id: number, data: CategoriaUpdateRequest): Promise<Categoria | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.nombre_categoria !== undefined) {
      fields.push('nombre_categoria = ?');
      values.push(data.nombre_categoria);
    }

    if (fields.length === 0) return this.getCategoriaById(id);

    values.push(id);

    const query = `UPDATE categorias SET ${fields.join(', ')} WHERE id_categoria = ?`;
    await pool.execute(query, values);

    return this.getCategoriaById(id);
  }

  async deleteCategoria(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM categorias WHERE id_categoria = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  async getCategoriaByName(nombre: string): Promise<Categoria | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM categorias WHERE nombre_categoria = ?',
      [nombre]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id_categoria: row.id_categoria,
      nombre_categoria: row.nombre_categoria,
    };
  }
}
