const db = require('../config/db');

const Curso = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT c.*, p.nombre AS profesor_nombre, p.apellido AS profesor_apellido
      FROM curso c
      LEFT JOIN profesor p ON c.id_profesor = p.id_profesor
    `);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM curso WHERE id_curso = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const { nombre, codigo, creditos, id_profesor } = data;
    const [result] = await db.query(
      'INSERT INTO curso (nombre, codigo, creditos, id_profesor) VALUES (?, ?, ?, ?)',
      [nombre, codigo, creditos, id_profesor]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { nombre, codigo, creditos, id_profesor } = data;
    const [result] = await db.query(
      'UPDATE curso SET nombre = ?, codigo = ?, creditos = ?, id_profesor = ? WHERE id_curso = ?',
      [nombre, codigo, creditos, id_profesor, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM curso WHERE id_curso = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Curso;
