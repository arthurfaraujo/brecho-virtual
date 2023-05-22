// Carregamento de  módulos
  import 'express-async-errors';  
  import express from 'express';
  import morgan from 'morgan';
  // Rotas
    import home from './routes/routes.js';

// Criação de constantes importantes
  const PORT = 3000;
  const server = express();

  // Configurações
  
    // configura o json do express
        server.use(express.json());
        server.use(express.urlencoded({ extended: true }));
        
    // mostra o que está acontecendo no servidor
        server.use(morgan('tiny'));

    // define a pasta de arquivos estáticos
        server.use(express.static('public'));

    // define o ejs como motor de visualização de páginas
        server.set('view engine', 'ejs');

// Rotas
    server.use(home);

// Botando o servidor pra rodar e escutar na porta PORT
  server.listen(PORT, () => {
    console.log(`Server is running and listening at port ${PORT}`);
  });