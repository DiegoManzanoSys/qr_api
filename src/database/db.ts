import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

// Esta función inicia la conexión a la base de datos
export async function getDbConnection() {
  return open({
    filename: path.resolve(__dirname, '../../qr_scanner.db'),
    driver: sqlite3.Database
  });
}

// Esta función inicializa la estructura de la base de datos
export async function initializeDatabase() {
  const db = await getDbConnection();
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS codigos (
      id TEXT PRIMARY KEY,
      data TEXT NOT NULL,
      type TEXT NOT NULL
    )
  `);

  // Insertar datos de ejemplo si la tabla está vacía
  const count = await db.get('SELECT COUNT(*) as count FROM codigos');
  if (count.count === 0) {
    await db.run(
      'INSERT INTO codigos (id, data, type) VALUES (?, ?, ?)',
      'a1b2c3d4e5f6', 'Ejemplo de data', 'qr'
    );
    
    await db.run(
      'INSERT INTO codigos (id, data, type) VALUES (?, ?, ?)',
      'g7h8i9j0k1l2', 'hola profe', 'qr'
    );
  }

  return db;
}