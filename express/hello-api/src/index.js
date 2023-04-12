// Carregamento de  módulos
  import express from 'express';
  import morgan from 'morgan';
  import {readFile} from 'fs/promises';
  import bdpa from 'body-parser';

// Criação de constantes importantes
  const PORT = 3000;
  const server = express();
  const data = JSON.parse(await readFile('public/data/produtos.json'))

// Configurações
  server.use(morgan('tiny'));
  server.use(express.static('public'));
  server.set('view engine', 'ejs');
  server.use(bdpa.urlencoded({extended: false}))
  server.use(bdpa.json())

// Rotas
  server.get('/login', (req, res) => {
    res.render('login.ejs');
  });

  server.post('/login', (req, res) => {
    const name = req.body.username;
    const password = req.body.password;

    res.send(name + " " + password)
  });

  server.get('/json', (req, res) => {
    res.json(data);
  })

// Ouvido do servidor
  server.listen(PORT, () => {
    console.log(`Server is running and listening at port ${PORT}`);
  });