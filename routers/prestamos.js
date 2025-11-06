const express = require('express');
const router = express.Router();
const conexion = require('../DB/conexion'); 
router.post('/', async (req, res) => {
  console.log("Datos recibidos:", req.body);
  try {
    const { idCliente, montoAprobado, tasaInteres, plazo, fechaAprobacion, estado } = req.body;
    const [result] = await conexion.query(
      'INSERT INTO prestamos (idCliente, montoAprobado, tasaInteres, plazo, fechaAprobacion, estado) VALUES (?, ?, ?, ?, ?, ?)',
      [idCliente, montoAprobado, tasaInteres, plazo, fechaAprobacion, estado]
    );
    console.log("Resultado INSERT:", result);
    res.json({ idPrestamo: result.insertId, ...req.body });
  } catch (error) {
    console.error("Error al registrar préstamo:", error);
    res.status(500).json({ error: 'Error al registrar préstamo' });
  }
});


module.exports = router;
