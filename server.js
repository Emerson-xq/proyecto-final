require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/clientes', require('./routers/clientes'));
app.use('/api/prestamos', require('./routers/prestamos'));
app.use('/api/letras', require('./routers/letras'));
app.use('/api/pagos', require('./routers/pagos'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
