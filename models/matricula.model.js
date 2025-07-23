const db = require('../config/db');

const Matricula = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT m.*, e.nombre AS estudiante_nombre, c.nombre AS curso_nombre
      FROM matricula m
      LEFT JOIN estudiante e ON m.id_estudiante = e.id_estudiante
      LEFT JOIN curso c ON m.id_curso = c.id_curso
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM matricula WHERE id_matricula = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const { id_estudiante, id_curso, semestre, fecha_matricula } = data;
    const [result] = await db.query(
      'INSERT INTO matricula (id_estudiante, id_curso, semestre, fecha_matricula) VALUES (?, ?, ?, ?)',
      [id_estudiante, id_curso, semestre, fecha_matricula]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { id_estudiante, id_curso, semestre, fecha_matricula } = data;
    const [result] = await db.query(
      'UPDATE matricula SET id_estudiante = ?, id_curso = ?, semestre = ?, fecha_matricula = ? WHERE id_matricula = ?',
      [id_estudiante, id_curso, semestre, fecha_matricula, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM matricula WHERE id_matricula = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Matricula;
