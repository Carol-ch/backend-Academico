const express = require('express');
const { body, param } = require('express-validator');
const controller = require('../controllers/profesor.controller');
const validarCampos = require('../middlewares/validarCampos');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profesores
 *   description: Gestión de profesores
 */

/**
 * @swagger
 * /api/profesores:
 *   get:
 *     summary: Obtener todos los profesores
 *     tags: [Profesores]
 *     responses:
 *       200:
 *         description: Lista de profesores
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/profesores/{id}:
 *   get:
 *     summary: Obtener un profesor por ID
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del profesor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profesor encontrado
 *       404:
 *         description: Profesor no encontrado
 */
router.get('/:id',
  [ param('id').isInt().withMessage('ID inválido'), validarCampos ],
  controller.getById
);

/**
 * @swagger
 * /api/profesores:
 *   post:
 *     summary: Crear un nuevo profesor
 *     tags: [Profesores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               correo:
 *                 type: string
 *               especialidad:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profesor creado
 *       400:
 *         description: Error de validación
 */
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('especialidad').notEmpty().withMessage('La especialidad es obligatoria'),
    validarCampos
  ],
  controller.create
);

/**
 * @swagger
 * /api/profesores/{id}:
 *   put:
 *     summary: Actualizar un profesor
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del profesor
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
 *               apellido:
 *                 type: string
 *               correo:
 *                 type: string
 *               especialidad:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profesor actualizado
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Profesor no encontrado
 */
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('ID inválido'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('especialidad').notEmpty().withMessage('La especialidad es obligatoria'),
    validarCampos
  ],
  controller.update
);

/**
 * @swagger
 * /api/profesores/{id}:
 *   delete:
 *     summary: Eliminar un profesor
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del profesor
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Profesor eliminado
 *       404:
 *         description: Profesor no encontrado
 */
router.delete(
  '/:id',
  [ param('id').isInt().withMessage('ID inválido'), validarCampos ],
  controller.delete
);

module.exports = router;
