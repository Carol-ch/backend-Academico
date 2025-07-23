const db = require('../config/db');

const Estudiante = {
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM estudiante');
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query('SELECT * FROM estudiante WHERE id_estudiante = ?', [id]);
    return rows[0];
  },

  create: async (data) => {
    const { nombre, apellido, correo, fecha_nacimiento, carrera } = data;
    const [result] = await db.query(
      'INSERT INTO estudiante (nombre, apellido, correo, fecha_nacimiento, carrera) VALUES (?, ?, ?, ?, ?)',
      [nombre, apellido, correo, fecha_nacimiento, carrera]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { nombre, apellido, correo, fecha_nacimiento, carrera } = data;
    const [result] = await db.query(
      'UPDATE estudiante SET nombre = ?, apellido = ?, correo = ?, fecha_nacimiento = ?, carrera = ? WHERE id_estudiante = ?',
      [nombre, apellido, correo, fecha_nacimiento, carrera, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query('DELETE FROM estudiante WHERE id_estudiante = ?', [id]);
    return result.affectedRows;
  }
};

module.exports = Estudiante;
