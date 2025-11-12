const express = require('express');
const path = require('path');

const app = express();

// Servir archivos estáticos desde la carpeta de build de Angular
app.use(express.static(path.join(__dirname, 'dist/angular-18-intento/browser')));

// Todas las rutas deben redirigir al index.html para que Angular routing funcione
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/angular-18-intento/browser/index.html'));
});

// Puerto configurado por Render o 8080 por defecto
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor Angular corriendo en puerto ${port}`);
});