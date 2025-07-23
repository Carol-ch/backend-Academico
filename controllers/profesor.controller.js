const Profesor = require('../models/profesor.model');

const profesorController = {
  getAll: async (req, res) => {
    try {
      const profesores = await Profesor.getAll();
      res.status(200).json(profesores);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener profesores', detail: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const profesor = await Profesor.getById(req.params.id);
      if (!profesor) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
      res.status(200).json(profesor);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener profesor', detail: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const id = await Profesor.create(req.body);
      res.status(201).json({ message: 'Profesor creado', id });
    } catch (err) {
      res.status(500).json({ error: 'Error al crear profesor', detail: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await Profesor.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
      res.status(200).json({ message: 'Profesor actualizado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al actualizar profesor', detail: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await Profesor.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Profesor no encontrado' });
      }
      res.status(200).json({ message: 'Profesor eliminado' });
    } catch (err) {
      res.status(500).json({ error: 'Error al eliminar profesor', detail: err.message });
    }
  }
};

module.exports = profesorController;
