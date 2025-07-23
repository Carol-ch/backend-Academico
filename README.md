# 📚 API RESTful Académica

Este proyecto es una API RESTful construida con **Node.js**, **Express** y **MySQL**, que gestiona los recursos académicos de una institución educativa, incluyendo:

- Estudiantes 👨‍🎓
- Profesores 👨‍🏫
- Cursos 📘
- Matrículas 📄
- Evaluaciones 📝

La documentación de la API está integrada con **Swagger** para facilitar la prueba e integración de los endpoints.

---

## 🚀 Tecnologías utilizadas

- Node.js + Express  
- MySQL  
- Swagger (Documentación de API)  
- express-validator (Validación de datos)  
- dotenv (Manejo de variables de entorno)  

---

## 🗂️ Estructura de carpetas

``
├── controllers/         # Lógica de negocio
├── models/              # Consultas SQL
├── routes/              # Rutas con validaciones y documentación Swagger
├── middlewares/         # Validación de campos con express-validator
├── config/              # Conexión a base de datos
├── docs/                # Configuración Swagger
├── .env                 # Variables de entorno (puerto, credenciales DB)
├── app.js               # Punto de entrada de la aplicación
``

---

## 📌 Endpoints principales

Cada recurso cuenta con los métodos CRUD básicos:

### Estudiantes `/api/estudiantes`

- `GET /` → Listar todos  
- `GET /:id` → Buscar por ID  
- `POST /` → Crear nuevo estudiante  
- `PUT /:id` → Actualizar por ID  
- `DELETE /:id` → Eliminar por ID  

### Profesores `/api/profesores`

- Misma estructura CRUD

### Cursos `/api/cursos`

- Incluye referencia al profesor mediante `id_profesor`

### Matrículas `/api/matriculas`

- Incluye referencias a `id_estudiante` y `id_curso`

### Evaluaciones `/api/evaluaciones`

- Incluye `id_matricula`, `tipo`, `nota` y `fecha`

---

## 🧪 Validación de datos

Se utiliza `express-validator` para validar entradas en rutas `POST` y `PUT`.  
Los errores son enviados con código `400` en caso de campos inválidos.

---

## 📑 Documentación Swagger

Disponible en:

``
http://localhost:3000/api-docs
``

Contiene descripciones, parámetros, ejemplos de errores y esquemas para cada recurso.

---

## ⚙️ Configuración del entorno

1. Clona el repositorio  
2. Instala dependencias:

``bash
npm install
``

3.Crea un archivo `.env` con tus variables:

``
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=base_academica
``

4.Inicia el servidor:

``bash
npm start
``
"# backend-Academico" 
