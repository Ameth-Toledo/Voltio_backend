import { IEspecificacionRepository } from '../../domain/IEspecificacionRepository';
import { Especificacion } from '../../domain/entities/Especificacion';
import { EspecificacionRequest, EspecificacionUpdateRequest } from '../../domain/dto/EspecificacionRequest';
import pool from '../../../core/config/conn';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class MySQLEspecificacionRepository implements IEspecificacionRepository {
  async createEspecificacion(data: EspecificacionRequest): Promise<Especificacion> {
    const query = 'INSERT INTO especificaciones (id_producto, clave, valor) VALUES (?, ?, ?)';
    const [result] = await pool.execute<ResultSetHeader>(query, [
      data.id_producto,
      data.clave,
      data.valor,
    ]);

    const especificacion = await this.getEspecificacionById(result.insertId);
    if (!especificacion) throw new Error('Especificacion not found after creation');
    return especificacion;
  }

  async getAllEspecificaciones(): Promise<Especificacion[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM especificaciones ORDER BY id_especificacion DESC'
    );

    return rows.map(row => ({
      id_especificacion: row.id_especificacion,
      id_producto: row.id_producto,
      clave: row.clave,
      valor: row.valor,
    }));
  }

  async getEspecificacionById(id: number): Promise<Especificacion | null> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM especificaciones WHERE id_especificacion = ?',
      [id]
    );

    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id_especificacion: row.id_especificacion,
      id_producto: row.id_producto,
      clave: row.clave,
      valor: row.valor,
    };
  }

  async getEspecificacionesByProductId(id_producto: number): Promise<Especificacion[]> {
    const [rows] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM especificaciones WHERE id_producto = ? ORDER BY id_especificacion ASC',
      [id_producto]
    );

    return rows.map(row => ({
      id_especificacion: row.id_especificacion,
      id_producto: row.id_producto,
      clave: row.clave,
      valor: row.valor,
    }));
  }

  async updateEspecificacion(id: number, data: EspecificacionUpdateRequest): Promise<Especificacion | null> {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.clave !== undefined) {
      fields.push('clave = ?');
      values.push(data.clave);
    }

    if (data.valor !== undefined) {
      fields.push('valor = ?');
      values.push(data.valor);
    }

    if (fields.length === 0) return this.getEspecificacionById(id);

    values.push(id);

    const query = `UPDATE especificaciones SET ${fields.join(', ')} WHERE id_especificacion = ?`;
    await pool.execute(query, values);

    return this.getEspecificacionById(id);
  }

  async deleteEspecificacion(id: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM especificaciones WHERE id_especificacion = ?',
      [id]
    );
    return result.affectedRows > 0;
  }

  async deleteEspecificacionesByProductId(id_producto: number): Promise<boolean> {
    const [result] = await pool.execute<ResultSetHeader>(
      'DELETE FROM especificaciones WHERE id_producto = ?',
      [id_producto]
    );
    return result.affectedRows > 0;
  }
}
