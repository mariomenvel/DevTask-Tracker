require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// 🔥 CORS PRIMERO (antes de rutas)
app.use(cors({
    origin: "*"
}));

app.use(express.json());

// Conexión MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(function () {
        console.log("Conectado a MongoDB Atlas");
    })
    .catch(function (error) {
        console.error("Error MongoDB:", error);
    });

// Rutas
const taskRoutes = require("./routes/tasks");
app.use("/api/tasks", taskRoutes);

// Servidor
const PORT = 3000;
app.listen(PORT, function () {
    console.log("Servidor escuchando en puerto " + PORT);
});
