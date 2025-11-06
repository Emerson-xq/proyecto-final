import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import routerPrestamos from "./routers/prestamos.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use("/api/prestamos", routerPrestamos);
try {
  const publicPath = path.resolve(__dirname, "public");
  app.use(express.static(publicPath));
  console.log("Carpeta pública servida desde:", publicPath);
} catch (error) {
  console.error("Error al configurar carpeta pública:", error.message);
}

app.get("/", (req, res) => {
  res.send(`
    <h1>Servidor Prestamos PYMES activo</h1>
    <p>API disponible en: <a href="/api/prestamos">/api/prestamos</a></p>
  `);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
