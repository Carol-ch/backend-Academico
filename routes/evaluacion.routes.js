const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/evaluacion.controller');
const validarCampos = require('../middlewares/validarCampos');

const router = express.Router();

/**
 * @swagger
 * /api/evaluaciones:
 *   get:
 *     summary: Obtener todas las evaluaciones
 *     tags: [Evaluaciones]
 *     responses:
 *       200:
 *         description: Lista de evaluaciones
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/evaluaciones/{id}:
 *   get:
 *     summary: Obtener una evaluación por ID
 *     tags: [Evaluaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la evaluación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Evaluación encontrada
 *       404:
 *         description: Evaluación no encontrada
 */
router.get('/:id', [
  param('id').isInt().withMessage('ID inválido'),
  validarCampos
], controller.getById);

/**
 * @swagger
 * /api/evaluaciones:
 *   post:
 *     summary: Crear una nueva evaluación
 *     tags: [Evaluaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_matricula:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               nota:
 *                 type: number
 *                 format: float
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Evaluación creada
 *       400:
 *         description: Error de validación de campos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                         example: El tipo es obligatorio
 *                       param:
 *                         type: string
 *                         example: tipo
 *                       location:
 *                         type: string
 *                         example: body
 */
router.post(
  '/',
  [
    body('id_matricula').isInt().withMessage('El ID de matrícula debe ser un número entero'),
    body('tipo').notEmpty().withMessage('El tipo es obligatorio'),
    body('nota').isFloat({ min: 0, max: 20 }).withMessage('La nota debe estar entre 0 y 20'),
    body('fecha').isDate().withMessage('La fecha debe ser válida'),
    validarCampos
  ],
  controller.create
);

/**
 * @swagger
 * /api/evaluaciones/{id}:
 *   put:
 *     summary: Actualizar una evaluación
 *     tags: [Evaluaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la evaluación
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_matricula:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               nota:
 *                 type: number
 *                 format: float
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Evaluación actualizada
 *       400:
 *         description: Error de validación de campos
 *       404:
 *         description: Evaluación no encontrada
 */
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('ID inválido'),
    body('id_matricula').isInt().withMessage('El ID de matrícula debe ser un número entero'),
    body('tipo').notEmpty().withMessage('El tipo es obligatorio'),
    body('nota').isFloat({ min: 0, max: 20 }).withMessage('La nota debe estar entre 0 y 20'),
    body('fecha').isDate().withMessage('La fecha debe ser válida'),
    validarCampos
  ],
  controller.update
);

/**
 * @swagger
 * /api/evaluaciones/{id}:
 *   delete:
 *     summary: Eliminar una evaluación
 *     tags: [Evaluaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la evaluación
 *     responses:
 *       200:
 *         description: Evaluación eliminada
 *       404:
 *         description: Evaluación no encontrada
 */
router.delete('/:id', [
  param('id').isInt().withMessage('ID inválido'),
  validarCampos
], controller.delete);

module.exports = router;
