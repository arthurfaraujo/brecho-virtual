// Carregamento de  módulos
  import 'express-async-errors';  
  import express from 'express';
  import morgan from 'morgan';
  import bdpa from 'body-parser';
  // Rotas
    import home from './routes/routes.js';

// Criação de constantes importantes
  const PORT = 8080;
  const server = express();

// Configurações
    // mostra o que está acontecendo no servidor
        server.use(morgan('tiny'));

    // define a pasta de arquivos estáticos
        server.use(express.static('public'));

    // define o ejs como motor de visualização de páginas
        server.set('view engine', 'ejs');

    // configura o body-parser
        server.use(bdpa.urlencoded({extended: false}));
        server.use(bdpa.json());

// Rotas
    server.use(home);

// Botando o servidor pra rodar e escutar na porta PORT
  server.listen(PORT, () => {
    console.log(`Server is running and listening at port ${PORT}`);
  });