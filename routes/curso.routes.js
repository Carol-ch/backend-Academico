const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/curso.controller');
const validarCampos = require('../middlewares/validarCampos');

const router = express.Router();

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Cursos]
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/cursos/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Curso encontrado
 *       404:
 *         description: Curso no encontrado
 */
router.get(
  '/:id',
  [param('id').isInt().withMessage('ID inválido'), validarCampos],
  controller.getById
);

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Cursos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               codigo:
 *                 type: string
 *               creditos:
 *                 type: integer
 *               id_profesor:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Curso creado
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
 *                         example: El nombre es obligatorio
 *                       param:
 *                         type: string
 *                         example: nombre
 *                       location:
 *                         type: string
 *                         example: body
 */
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('codigo').notEmpty().withMessage('El código es obligatorio'),
    body('creditos')
      .isInt({ min: 1 })
      .withMessage('Los créditos deben ser un número entero positivo'),
    body('id_profesor').isInt().withMessage('El ID del profesor debe ser un entero'),
    validarCampos
  ],
  controller.create
);

/**
 * @swagger
 * /api/cursos/{id}:
 *   put:
 *     summary: Actualizar un curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del curso
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               codigo:
 *                 type: string
 *               creditos:
 *                 type: integer
 *               id_profesor:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Curso actualizado
 *       400:
 *         description: Error de validación de campos
 *       404:
 *         description: Curso no encontrado
 */
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('ID inválido'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('codigo').notEmpty().withMessage('El código es obligatorio'),
    body('creditos')
      .isInt({ min: 1 })
      .withMessage('Los créditos deben ser un número entero positivo'),
    body('id_profesor').isInt().withMessage('El ID del profesor debe ser un entero'),
    validarCampos
  ],
  controller.update
);

/**
 * @swagger
 * /api/cursos/{id}:
 *   delete:
 *     summary: Eliminar un curso
 *     tags: [Cursos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del curso
 *     responses:
 *       200:
 *         description: Curso eliminado
 *       404:
 *         description: Curso no encontrado
 */
router.delete(
  '/:id',
  [param('id').isInt().withMessage('ID inválido'), validarCampos],
  controller.delete
);

module.exports = router;
