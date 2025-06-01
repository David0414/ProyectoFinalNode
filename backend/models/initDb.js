const db = require('../config/db');
const bcrypt = require('bcryptjs');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS empleados (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      apellidos TEXT,
      telefono TEXT,
      correo TEXT,
      direccion TEXT
    )
  `);

  // Crea un usuario admin por defecto
  const password = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT OR IGNORE INTO usuarios (username, password) VALUES (?, ?)`, ['admin', password]);

  console.log('Base de datos inicializada');
});
