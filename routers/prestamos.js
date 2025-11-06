import express from "express";
import { conexion } from "../DB/conexion.js"; 

const router = express.Router();
router.post("/", async (req, res) => {
  console.log("Datos recibidos:", req.body);

  try {
    const { idCliente, montoAprobado, tasaInteres, plazo, fechaAprobacion, estado } = req.body;

    const [result] = await conexion.execute(
      "INSERT INTO prestamos (idCliente, montoAprobado, tasaInteres, plazo, fechaAprobacion, estado) VALUES (?, ?, ?, ?, ?, ?)",
      [idCliente, montoAprobado, tasaInteres, plazo, fechaAprobacion, estado]
    );

    console.log("Resultado INSERT:", result);

    res.json({ idPrestamo: result.insertId, ...req.body });
  } catch (error) {
    console.error("Error al registrar préstamo:", error);
    res.status(500).json({ error: "Error al registrar préstamo" });
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows] = await conexion.execute("SELECT * FROM prestamos");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener préstamos:", error);
    res.status(500).json({ error: "Error al obtener préstamos" });
  }
});

export default router;
