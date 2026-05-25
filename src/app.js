require('dotenv').config();

const express = require('express');
const path = require('path');

const weatherRoutes = require('./routes/clima.routes');

const app = express();

const PORT = process.env.PORT || 3000;

// Configuración EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'vista'));

// Middleware
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/', weatherRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
    console.log("API KEY:", process.env.API_KEY);
});