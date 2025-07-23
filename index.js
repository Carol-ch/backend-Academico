const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas API
const estudianteRoutes = require('./routes/estudiante.routes');
const profesorRoutes = require('./routes/profesor.routes');
const cursoRoutes = require('./routes/curso.routes');
const matriculaRoutes = require('./routes/matricula.routes');
const evaluacionRoutes = require('./routes/evaluacion.routes');

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

// Rutas montadas
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/profesores', profesorRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/matriculas', matriculaRoutes);
app.use('/api/evaluaciones', evaluacionRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta base
app.get('/', (req, res) => {
  res.send('✅ API Académico funcionando. Visita /api-docs para documentación.');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
