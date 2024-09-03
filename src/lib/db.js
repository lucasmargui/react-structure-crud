import mysql from 'mysql2/promise';

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

// Função para obter uma conexão com o banco de dados
export async function getDbConnection() {
  try {
    console.log('Attempting to connect with config:', JSON.stringify(config, null, 2));
    const connection = await mysql.createConnection(config);
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
}
