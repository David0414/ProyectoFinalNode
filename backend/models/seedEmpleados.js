const db = require('../config/db');

const empleados = [
  ['Juan', 'Pérez', '4421234567', 'juan.perez@gmail.com', 'Querétaro'],
  ['Ana', 'López', '4427654321', 'ana.lopez@hotmail.com', 'CDMX'],
  ['Luis', 'Martínez', '4421112233', 'luis.mtz@yahoo.com', 'Monterrey'],
  ['Sofía', 'Ramírez', '4423344556', 'sofia.rz@gmail.com', 'Guadalajara'],
  ['Carlos', 'García', '4425566778', 'carlos.garcia@outlook.com', 'Cancún'],
  ['Daniela', 'Mendoza', '4427788990', 'daniela.mendoza@gmail.com', 'León'],
  ['Miguel', 'Torres', '4421122334', 'miguel.torres@hotmail.com', 'Tijuana'],
  ['Laura', 'Hernández', '4429988776', 'laura.hdz@gmail.com', 'Mérida'],
  ['Pedro', 'Santos', '4424433221', 'pedro.santos@yahoo.com', 'Chihuahua'],
  ['María', 'Jiménez', '4423344668', 'maria.jimenez@gmail.com', 'Toluca'],
  ['Fernando', 'Castillo', '4425566443', 'fernando.castillo@gmail.com', 'Saltillo'],
  ['Karla', 'Ortega', '4426677889', 'karla.ortega@hotmail.com', 'Puebla'],
  ['Roberto', 'Núñez', '4429988775', 'roberto.nunez@outlook.com', 'Acapulco'],
  ['Jessica', 'Flores', '4421122553', 'jessica.flores@gmail.com', 'Irapuato'],
  ['Antonio', 'Reyes', '4427788991', 'antonio.reyes@hotmail.com', 'Zacatecas'],
  ['Carmen', 'Salinas', '4426655443', 'carmen.salinas@gmail.com', 'San Luis Potosí'],
  ['Diego', 'Morales', '4421113344', 'diego.morales@yahoo.com', 'Cuernavaca'],
  ['Paola', 'Vargas', '4424433556', 'paola.vargas@gmail.com', 'Tampico'],
  ['Héctor', 'Navarro', '4425566774', 'hector.navarro@outlook.com', 'Durango'],
  ['Gloria', 'Cruz', '4429988444', 'gloria.cruz@gmail.com', 'Colima']
];

db.all('SELECT COUNT(*) as count FROM empleados', (err, rows) => {
  if (!err && rows[0].count === 0) {
    const stmt = db.prepare(`INSERT INTO empleados (nombre, apellidos, telefono, correo, direccion) VALUES (?, ?, ?, ?, ?)`);
    empleados.forEach(emp => stmt.run(emp));
    stmt.finalize();
    console.log('✅ Empleados de prueba insertados');
  } else {
    console.log('ℹ️ Ya existen empleados en la base de datos');
  }
});
