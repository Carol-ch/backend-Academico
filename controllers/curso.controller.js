const Curso = require('../models/curso.model');

const cursoController = {
  getAll: async (req, res) => {
    try {
      const cursos = await Curso.getAll();
      res.status(200).json(cursos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los cursos', detail: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const curso = await Curso.getById(req.params.id);
      if (!curso) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.status(200).json(curso);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener el curso', detail: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const id = await Curso.create(req.body);
      res.status(201).json({ message: 'Curso creado', id });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el curso', detail: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const actualizado = await Curso.update(req.params.id, req.body);
      if (!actualizado) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.status(200).json({ message: 'Curso actualizado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el curso', detail: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const eliminado = await Curso.delete(req.params.id);
      if (!eliminado) {
        return res.status(404).json({ message: 'Curso no encontrado' });
      }
      res.status(200).json({ message: 'Curso eliminado' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el curso', detail: error.message });
    }
  }
};

module.exports = cursoController;
