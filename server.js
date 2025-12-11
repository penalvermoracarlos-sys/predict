// server.js
// Entry point del servicio PREDICT

require("dotenv").config(); // cargar variables .env

const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const predictRoutes = require("./routes/predictRoutes");
const { initModel } = require("./services/tfModelService");

// ===========================
//   Variables de entorno
// ===========================

const PORT = process.env.PORT || 3002;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/predictions";
const MODEL_DIR = process.env.MODEL_DIR || "model";

// ===========================
//   Inicializar app
// ===========================
const app = express();
app.use(express.json());

// ===========================
//   Conexión a MongoDB
// ===========================
mongoose.connect(MONGO_URI)
  .then(() => console.log("[MONGO] Conectado a MongoDB"))
  .catch(err => {
    console.error("[MONGO] Error MongoDB:", err);
    process.exit(1);
  });

// ===========================
//   Servir carpeta MODEL TFJS
// ===========================
const modelDir = path.resolve(__dirname, MODEL_DIR);
app.use("/model", express.static(modelDir));

// ===========================
//   Rutas del servicio PREDICT
// ===========================
app.use("/", predictRoutes);

// ===========================
//   Arranque del servidor + modelo
// ===========================
app.listen(PORT, async () => {
  const serverUrl = `http://localhost:${PORT}`;
  console.log(`[PREDICT] Servicio escuchando en ${serverUrl}`);

  try {
    await initModel(serverUrl);
  } catch (err) {
    console.error("Error al inicializar modelo:", err);
    process.exit(1);
  }
});

