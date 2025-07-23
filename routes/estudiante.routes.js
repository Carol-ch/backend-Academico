const express = require('express');
const { body, param } = require('express-validator');
const validarCampos = require('../middlewares/validarCampos');
const controller = require('../controllers/estudiante.controller');

const router = express.Router();

/**
 * @swagger
 * /api/estudiantes:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de estudiantes
 *       500:
 *         description: Error del servidor
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /api/estudiantes/{id}:
 *   get:
 *     summary: Obtener un estudiante por ID
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Estudiante encontrado
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.get('/:id', controller.getById);

/**
 * @swagger
 * /api/estudiantes:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
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
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *               carrera:
 *                 type: string
 *     responses:
 *       201:
 *         description: Estudiante creado
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
 *       500:
 *         description: Error del servidor
 */
router.post(
  '/',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('fecha_nacimiento').optional().isDate().withMessage('Fecha inválida'),
    body('carrera').notEmpty().withMessage('La carrera es obligatoria'),
    validarCampos,
  ],
  controller.create
);

/**
 * @swagger
 * /api/estudiantes/{id}:
 *   put:
 *     summary: Actualizar un estudiante
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
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
 *               fecha_nacimiento:
 *                 type: string
 *                 format: date
 *               carrera:
 *                 type: string
 *     responses:
 *       200:
 *         description: Estudiante actualizado
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
 *                         example: El correo es inválido
 *                       param:
 *                         type: string
 *                         example: correo
 *                       location:
 *                         type: string
 *                         example: body
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.put(
  '/:id',
  [
    param('id').isInt().withMessage('ID inválido'),
    body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
    body('apellido').notEmpty().withMessage('El apellido es obligatorio'),
    body('correo').isEmail().withMessage('Correo inválido'),
    body('fecha_nacimiento').optional().isDate().withMessage('Fecha inválida'),
    body('carrera').notEmpty().withMessage('La carrera es obligatoria'),
    validarCampos
  ],
  controller.update
);

/**
 * @swagger
 * /api/estudiantes/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estudiante
 *     responses:
 *       200:
 *         description: Estudiante eliminado
 *       404:
 *         description: Estudiante no encontrado
 *       500:
 *         description: Error del servidor
 */
router.delete('/:id', controller.delete);

module.exports = router;
