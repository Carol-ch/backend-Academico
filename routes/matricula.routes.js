const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/matricula.controller');
const validarCampos = require('../middlewares/validarCampos');

const router = express.Router();

/**
 * @swagger
 * /api/matriculas:
 *   get:
 *     summary: Obtener todas las matrículas
 *     tags: [Matrículas]
 *     responses:
 *       200:
 *         description: Lista de matrículas
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/matriculas/{id}:
 *   get:
 *     summary: Obtener una matrícula por ID
 *     tags: [Matrículas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la matrícula
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Matrícula encontrada
 *       404:
 *         description: Matrícula no encontrada
 *       400:
 *         description: ID inválido
 */
router.get(
  '/:id',
  [param('id').isInt().withMessage('ID inválido'), validarCampos],
  controller.getById
);

/**
 * @swagger
 * /api/matriculas:
 *   post:
 *     summary: Crear una nueva matrícula
 *     tags: [Matrículas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_estudiante
 *               - id_curso
 *               - semestre
 *               - fecha_matricula
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *               id_curso:
 *                 type: integer
 *               semestre:
 *                 type: string
 *               fecha_matricula:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Matrícula creada
 *       400:
 *         description: Error de validación de campos
 */
router.post(
  '/',
  [
    body('id_estudiante').isInt().withMessage('ID de estudiante inválido'),
    body('id_curso').isInt().withMessage('ID de curso inválido'),
    body('semestre').notEmpty().withMessage('El semestre es obligatorio'),
    body('fecha_matricula').isDate().withMessage('Fecha de matrícula inválida'),
    validarCampos
  ],
  controller.create
);

/**
 * @swagger
 * /api/matriculas/{id}:
 *   put:
 *     summary: Actualizar una matrícula
 *     tags: [Matrículas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la matrícula
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_estudiante
 *               - id_curso
 *               - semestre
 *               - fecha_matricula
 *             properties:
 *               id_estudiante:
 *                 type: integer
 *               id_curso:
 *                 type: integer
 *               semestre:
 *                 type: string
 *               fecha_matricula:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Matrícula actualizada
 *       400:
 *         description: Error de validación de campos
 *       404:
 *         description: Matrícula no encontrada
 */
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('ID inválido'),
    body('id_estudiante').isInt().withMessage('ID de estudiante inválido'),
    body('id_curso').isInt().withMessage('ID de curso inválido'),
    body('semestre').notEmpty().withMessage('El semestre es obligatorio'),
    body('fecha_matricula').isDate().withMessage('Fecha de matrícula inválida'),
    validarCampos
  ],
  controller.update
);

/**
 * @swagger
 * /api/matriculas/{id}:
 *   delete:
 *     summary: Eliminar una matrícula
 *     tags: [Matrículas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la matrícula
 *     responses:
 *       200:
 *         description: Matrícula eliminada
 *       404:
 *         description: Matrícula no encontrada
 *       400:
 *         description: ID inválido
 */
router.delete(
  '/:id',
  [param('id').isInt().withMessage('ID inválido'), validarCampos],
  controller.delete
);

module.exports = router;
