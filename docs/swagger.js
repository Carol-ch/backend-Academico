const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API Académico',
    version: '1.0.0',
    description: 'Documentación de la API RESTful del sistema académico.',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Escanea todos los archivos de rutas
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
