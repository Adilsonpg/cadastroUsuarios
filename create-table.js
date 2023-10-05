import { sql } from './db.js';

async function createUsuariosTable() {
  try {
    // Consulta SQL para criar a tabela "usuarios"
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL
      )
    `;

    // Execute a consulta SQL para criar a tabela
    await sql.unsafe(createTableQuery);

    console.log('Tabela "usuarios" criada com sucesso.');
  } catch (error) {
    console.error('Erro ao criar a tabela "usuarios":', error);
  } finally {
    sql.end(); // Encerra a conexão com o PostgreSQL
  }
}

createUsuariosTable();




