import { fastify } from 'fastify';
import fastifyStatic from 'fastify-static';
import path from 'path';
import { fileURLToPath } from 'url';
import { sql } from './db.js'; // Importe a função sql do seu arquivo db.js

const server = fastify();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.register(fastifyStatic, {
  root: path.join(__dirname, 'assets'),
  prefix: '/',
});

server.get('/', async (request, reply) => {
  reply.sendFile('index.html');
});

// Rota para buscar usuários com base em uma consulta
server.get('/buscar-usuarios', async (request, reply) => {
  try {
    const { query } = request.query;

    // Consulta SQL para buscar usuários com base na pesquisa
    const searchUsersQuery = sql`
      SELECT id, nome, email, senha
      FROM usuarios
      WHERE nome ILIKE ${`%${query}%`} OR email ILIKE ${`%${query}%`}
    `;

    // Execute a consulta SQL para buscar usuários
    const users = await searchUsersQuery;

    // Responda com os resultados da pesquisa em formato JSON
    reply.send(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    reply.code(500).send('Erro ao buscar usuários.');
  }
});

// Rota para deletar um usuário com base no ID
server.delete('/deletar-usuario/:id', async (request, reply) => {
  try {
    const { id } = request.params;

    // Consulta SQL para deletar um usuário com base no ID
    const deleteUserQuery = sql`
      DELETE FROM usuarios
      WHERE id = ${id}
    `;

    // Execute a consulta SQL para deletar o usuário
    await deleteUserQuery;

    // Responda com uma mensagem de sucesso
    reply.send({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    reply.code(500).send('Erro ao deletar usuário.');
  }
});

// Rota para salvar um novo usuário
server.post('/salvar-usuario', async (request, reply) => {
  try {
    // Capture os dados do usuário do corpo da solicitação
    const { nome, email, senha } = request.body;

    // Consulta SQL para inserir um novo usuário na tabela "usuarios"
    const insertUserQuery = sql`
      INSERT INTO usuarios (nome, email, senha)
      VALUES (${nome}, ${email}, ${senha})
      RETURNING id
    `;

    // Execute a consulta SQL para inserir o usuário e obter o ID gerado
    const newUser = await insertUserQuery;

    // Responda com o ID do novo usuário
    reply.code(201).send(`Usuário cadastrado com sucesso! ID: ${newUser[0].id}`);
    console.log('Cadastro Realizado com sucesso');
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    reply.code(500).send('Erro ao cadastrar usuário.');
  }
});

server.listen({
  port: 3333,
});