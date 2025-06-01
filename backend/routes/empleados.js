const express = require('express');
const db = require('../config/db');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

// Todas estas rutas estarán protegidas
router.use(verifyToken);

// GET - Consultar todos los empleados
router.get('/', (req, res) => {
  db.all('SELECT * FROM empleados', (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener empleados' });
    res.json(rows);
  });
});

// POST - Agregar empleado
router.post('/', (req, res) => {
  const { nombre, apellidos, telefono, correo, direccion } = req.body;
  const query = `INSERT INTO empleados (nombre, apellidos, telefono, correo, direccion) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [nombre, apellidos, telefono, correo, direccion], function (err) {
    if (err) return res.status(500).json({ error: 'Error al agregar empleado' });
    res.json({ id: this.lastID });
  });
});

// PUT - Modificar empleado
router.put('/:id', (req, res) => {
  const { nombre, apellidos, telefono, correo, direccion } = req.body;
  const query = `UPDATE empleados SET nombre=?, apellidos=?, telefono=?, correo=?, direccion=? WHERE id=?`;
  db.run(query, [nombre, apellidos, telefono, correo, direccion, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al modificar empleado' });
    res.json({ updated: this.changes });
  });
});

// DELETE - Eliminar empleado
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM empleados WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: 'Error al eliminar empleado' });
    res.json({ deleted: this.changes });
  });
});

// GET - Buscar por nombre
router.get('/buscar/:termino', (req, res) => {
  const termino = req.params.termino;
  const query = `
    SELECT * FROM empleados
    WHERE nombre LIKE ? 
    OR apellidos LIKE ? 
    OR telefono LIKE ?
    OR correo LIKE ?
  `;
  const values = Array(4).fill(`%${termino}%`);
  
  db.all(query, values, (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error en la búsqueda' });
    res.json(rows);
  });
});


module.exports = router;
