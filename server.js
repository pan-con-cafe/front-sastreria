const express = require('express');
const path = require('path');

const app = express();

const distPath = path.join(__dirname, 'dist/angular-18-intento/browser');

// Servir archivos estáticos
app.use(express.static(distPath));

// Middleware para manejar todas las rutas (debe ir después de static)
app.use((req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Puerto configurado por Render o 8080 por defecto
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Servidor Angular corriendo en puerto ${port}`);
});