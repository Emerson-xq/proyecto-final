const pool = require('../DB/conexion');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM Clientes WHERE activo IS NULL OR activo = 1');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener clientes' });
  }
};

exports.create = async (req, res) => {
  const { Nombre, Apellido, dni, Telefono, Direccion, TipoCliente } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO Clientes (Nombre, Apellido, dni, Telefono, Direccion, TipoCliente) VALUES (?, ?, ?, ?, ?, ?)',
      [Nombre, Apellido, dni, Telefono, Direccion, TipoCliente]
    );
    res.status(201).json({ idCliente: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear cliente' });
  }
};