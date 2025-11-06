const pool = require('../DB/conexion');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT l.*, p.montoAprobado, c.Nombre, c.Apellido
      FROM LetrasdeCambios l
      JOIN Prestamos p ON l.idPrestamo = p.idPrestamo
      JOIN Clientes c ON p.idCliente = c.idCliente
      ORDER BY l.fechaVencimiento ASC
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener letras' });
  }
};

exports.create = async (req, res) => {
  const { idPrestamo, monto, fechaEmision, fechaVencimiento, estado } = req.body;
  try {
    const [result] = await pool.query(`
      INSERT INTO LetrasdeCambios (idPrestamo, monto, fechaEmision, fechaVencimiento, estado)
      VALUES (?, ?, ?, ?, ?)
    `, [idPrestamo, monto, fechaEmision, fechaVencimiento, estado]);
    res.status(201).json({ idLetra: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Error al crear letra' });
  }
};

exports.getByPrestamo = async (req, res) => {
  const { idPrestamo } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM LetrasdeCambios WHERE idPrestamo = ?', [idPrestamo]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener letras del préstamo' });
  }
};