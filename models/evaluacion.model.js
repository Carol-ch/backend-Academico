const db = require('../config/db');

const Evaluacion = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT e.*, m.semestre, m.id_estudiante, m.id_curso
      FROM evaluacion e
      LEFT JOIN matricula m ON e.id_matricula = m.id_matricula
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM evaluacion WHERE id_evaluacion = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const { id_matricula, tipo, nota, fecha } = data;
    const [result] = await db.query(
      'INSERT INTO evaluacion (id_matricula, tipo, nota, fecha) VALUES (?, ?, ?, ?)',
      [id_matricula, tipo, nota, fecha]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { id_matricula, tipo, nota, fecha } = data;
    const [result] = await db.query(
      'UPDATE evaluacion SET id_matricula = ?, tipo = ?, nota = ?, fecha = ? WHERE id_evaluacion = ?',
      [id_matricula, tipo, nota, fecha, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM evaluacion WHERE id_evaluacion = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Evaluacion;
