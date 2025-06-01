const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const router = express.Router();

// Iniciar sesión
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM usuarios WHERE username = ?', [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos' });
    if (!user) return res.status(401).json({ error: 'Usuario no encontrado' });

    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ token });
  });
});

module.exports = router;
