// Carregamento de  módulos
  import express from 'express';
  import morgan from 'morgan';
// Criação de constantes importantes
  const server = express();

// Configurações
  server.use(morgan('tiny'));
  server.use(express.static('public'));

// Rotas
  server.get('/login', (req, res) => {
    res.sendFile('views/login.html');
  });

  server.get('/json', (req, res) => {
    res.json();
  })

// Ouvido do servidor
  server.listen(3001, () => {
    console.log('O servidor está rodando');
  });