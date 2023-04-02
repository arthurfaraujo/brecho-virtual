// Carregamento de  módulos
  import express from 'express';
  import morgan from 'morgan';
  import { fileURLToPath } from 'url';
  import path from 'path';
  import ejs from 'ejs';

// Criação de constantes importantes
  const __dirname = fileURLToPath(import.meta.url).replace('index.js', '');
  const server = express();

// Configurações
  server.use(morgan('tiny'));
  server.use(express.static(path.join(__dirname, "public")));

// Rotas
  server.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
  });

  server.get('/login', (req, res) => {
    res.sendFile(__dirname + '/views/login.html')
  });

// Ouvido do servidor
  server.listen(3000, () => {
    console.log('O servidor está rodando');
  });