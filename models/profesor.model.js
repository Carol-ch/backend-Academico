const db = require('../config/db');

const Profesor = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM profesor');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM profesor WHERE id_profesor = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const { nombre, apellido, correo, especialidad } = data;
    const [result] = await db.query(
      'INSERT INTO profesor (nombre, apellido, correo, especialidad) VALUES (?, ?, ?, ?)',
      [nombre, apellido, correo, especialidad]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { nombre, apellido, correo, especialidad } = data;
    const [result] = await db.query(
      'UPDATE profesor SET nombre = ?, apellido = ?, correo = ?, especialidad = ? WHERE id_profesor = ?',
      [nombre, apellido, correo, especialidad, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM profesor WHERE id_profesor = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Profesor;
