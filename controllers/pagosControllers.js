const pool = require('../DB/conexion');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT pa.*, c.Nombre, c.Apellido, p.montoAprobado
      FROM Pagos pa
      JOIN Prestamos p ON pa.idPrestamo = p.idPrestamo
      JOIN Clientes c ON p.idCliente = c.idCliente
      ORDER BY pa.fechaEmision DESC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pagos' });
  }
};

exports.create = async (req, res) => {
  const { idPrestamo, monto, fechaEmision, fechaVencimiento, estado } = req.body;
  try {
    const [result] = await pool.query(`
      INSERT INTO Pagos (idPrestamo, monto, fechaEmision, fechaVencimiento, estado)
      VALUES (?, ?, ?, ?, ?)
    `, [idPrestamo, monto, fechaEmision, fechaVencimiento, estado]);
    res.status(201).json({ idPago: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar pago' });
  }
};

exports.getByPrestamo = async (req, res) => {
  const { idPrestamo } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM Pagos WHERE idPrestamo = ?', [idPrestamo]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener pagos del préstamo' });
  }
};