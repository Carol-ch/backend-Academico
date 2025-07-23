const Estudiante = require('../models/estudiante.model');

const estudianteController = {
  // Obtener todos los estudiantes
  getAll: async (req, res) => {
    try {
      const data = await Estudiante.getAll();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ error: 'Error del servidor', details: err.message });
    }
  },

  // Obtener estudiante por ID
  getById: async (req, res) => {
    try {
      const estudiante = await Estudiante.getById(req.params.id);
      if (!estudiante) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      res.status(200).json(estudiante);
    } catch (err) {
      res.status(500).json({ error: 'Error del servidor', details: err.message });
    }
  },

  // Crear nuevo estudiante
  create: async (req, res) => {
    try {
      const id = await Estudiante.create(req.body);
      res.status(201).json({ message: 'Estudiante creado', id });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear estudiante', details: err.message });
    }
  },

  // Actualizar estudiante por ID
  update: async (req, res) => {
    try {
      const updated = await Estudiante.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      res.status(200).json({ message: 'Estudiante actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar estudiante', details: err.message });
    }
  },

  // Eliminar estudiante por ID
  delete: async (req, res) => {
    try {
      const deleted = await Estudiante.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Estudiante no encontrado' });
      }
      res.status(200).json({ message: 'Estudiante eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar estudiante', details: err.message });
    }
  }
};

module.exports = estudianteController;
