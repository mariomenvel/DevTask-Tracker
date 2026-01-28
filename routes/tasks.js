const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// GET /api/tasks
router.get("/", async function (req, res) {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener tareas" });
    }
});

// POST /api/tasks
router.post("/", async function (req, res) {
    try {
        const nuevaTarea = new Task({
            titulo: req.body.titulo,
            tecnologia: req.body.tecnologia,
            estado: req.body.estado
        });

        await nuevaTarea.save();
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ error: "Error al guardar tarea" });
    }
});

// DELETE /api/tasks/:id
router.delete("/:id", async function (req, res) {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar tarea" });
    }
});

module.exports = router;
