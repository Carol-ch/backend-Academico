const Evaluacion = require('../models/evaluacion.model');

const evaluacionController = {
  getAll: async (req, res) => {
    try {
      const data = await Evaluacion.getAll();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener las evaluaciones', error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const evaluacion = await Evaluacion.getById(req.params.id);
      if (!evaluacion) {
        return res.status(404).json({ message: 'Evaluación no encontrada' });
      }
      res.status(200).json(evaluacion);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener la evaluación', error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const id = await Evaluacion.create(req.body);
      res.status(201).json({ message: 'Evaluación creada', id });
    } catch (err) {
      res.status(500).json({ message: 'Error al crear la evaluación', error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await Evaluacion.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: 'Evaluación no encontrada' });
      }
      res.status(200).json({ message: 'Evaluación actualizada' });
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar la evaluación', error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await Evaluacion.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Evaluación no encontrada' });
      }
      res.status(200).json({ message: 'Evaluación eliminada' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar la evaluación', error: err.message });
    }
  }
};

module.exports = evaluacionController;
