const Matricula = require('../models/matricula.model');

const matriculaController = {
  getAll: async (req, res) => {
    try {
      const data = await Matricula.getAll();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener las matrículas', details: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

      const matricula = await Matricula.getById(id);
      if (!matricula) return res.status(404).json({ message: 'Matrícula no encontrada' });

      res.status(200).json(matricula);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener la matrícula', details: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const { id_estudiante, id_curso, semestre, fecha_matricula } = req.body;

      // Validación básica (ya deberías tener validaciones con express-validator también)
      if (!id_estudiante || !id_curso || !semestre || !fecha_matricula) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
      }

      const id = await Matricula.create(req.body);
      res.status(201).json({ id });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear la matrícula', details: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

      const updated = await Matricula.update(id, req.body);
      if (!updated) return res.status(404).json({ message: 'Matrícula no encontrada' });

      res.status(200).json({ message: 'Matrícula actualizada' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar la matrícula', details: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) return res.status(400).json({ message: 'ID inválido' });

      const deleted = await Matricula.delete(id);
      if (!deleted) return res.status(404).json({ message: 'Matrícula no encontrada' });

      res.status(200).json({ message: 'Matrícula eliminada' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar la matrícula', details: err.message });
    }
  }
};

module.exports = matriculaController;
