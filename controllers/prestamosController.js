const pool = require('../DB/conexion');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, c.Nombre, c.Apellido
      FROM Prestamos p
      JOIN Clientes c ON p.idCliente = c.idCliente
      ORDER BY p.idPrestamo DESC
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener préstamos' });
  }
};

exports.create = async (req, res) => {
  const { idCliente, montoAprobado, tasaInteres, plazo, fechaAprobacion, documentoLetra, estado } = req.body;
  try {
    const [result] = await pool.query(`
      INSERT INTO Prestamos (idCliente, montoAprobado, tasaInteres, plazo, fechaAprobacion, documentoLetra, estado)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [idCliente, montoAprobado, tasaInteres, plazo, fechaAprobacion, documentoLetra, estado]);
    res.status(201).json({ idPrestamo: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar préstamo' });
  }
};

exports.getByCliente = async (req, res) => {
  const { idCliente } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Prestamos WHERE idCliente = ?', [idCliente]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener préstamos del cliente' });
  }
};