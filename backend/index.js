require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('./models/initDb');

const authRoutes = require('./routes/auth');
const empleadosRoutes = require('./routes/empleados');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
