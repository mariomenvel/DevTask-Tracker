# DevTask Tracker - Ingeniería de Software (Native FullStack)

Este proyecto es una aplicación FullStack completa desarrollada siguiendo estándares web nativos para demostrar competencia técnica en Ingeniería de Software.

## ⚙️ Arquitectura "Bajo el Capó"

- **Frontend**: HTML5 Semántico, CSS3 Moderno (Glassmorphism) y JavaScript ES6+ (Vanilla JS). Se utiliza la **Fetch API** para la comunicación asíncrona (AJAX). **Sin librerías externas ni magia.**
- **Backend**: Servidor robusto con Node.js y Express. Maneja rutas API REST y sirve los archivos de la interfaz.
- **Base de Datos**: Persistencia en la nube con MongoDB Atlas. Implementación completa de operaciones CRUD.

## 🚀 Instalación y Uso

1. **Clonar el repositorio y entrar en la carpeta del backend**:
   ```bash
   cd backend
   npm install
   ```

2. **Configurar Variables de Entorno**:
   Crea un archivo `.env` en la carpeta `backend/` basándote en el archivo `.env.example`:
   ```bash
   MONGO_URI=tu_uri_de_mongodb_atlas
   ```

3. **Arrancar la Aplicación**:
   ```bash
   npm start
   ```
   La aplicación estará disponible en `http://localhost:3000`.

## ✅ Cumplimiento de Criterios (RA)

- **RA1 (Interfaz)**: Web dinámica con carga de datos vía Fetch. CSS responsivo y agradable sin frameworks. JS organizado por responsabilidades.
- **RA2 (Servidor)**: API Express con códigos de estado adecuados (200, 201, 404, 500) y respuestas JSON válidas.
- **RA3 (Base de Datos)**: CRUD completo (Create, Read, Update, Delete) funcionando sobre MongoDB Atlas. Esquema definido mediante Mongoose.
- **RA4 (Despliegue/Git)**: Repositorio limpio con `.gitignore` funcional, sin `node_modules` ni secretos expuestos. README detallado incluido.
