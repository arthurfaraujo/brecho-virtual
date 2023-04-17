// Carregamento de  módulos
  import express from 'express';
  import morgan from 'morgan';
  import bdpa from 'body-parser';
  // Rotas
    import home from './routes/home.js';
    import data from './routes/data.js';

// Criação de constantes importantes
  const PORT = 3000;
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

  // Classe que trata erros
  export class HTTPError extends Error {
    constructor(message, code) {
      super(message);
      this.code = code;
    }
  }

// Rotas
  server.use('/', home);

  server.use('/data', data);

// Manipular erros sem quebrar o servidor
  // 404
    server.use((req, res, next) => {
      res.status(404).json({ message: 'Content not found!' });
    });

  // Outros
    server.use((err, req, res, next) => {
      console.error(err.stack);
      if (err instanceof HTTPError) {
        res.status(err.code).json({ message: err.message });
      } else {
        res.status(500).json({ message: 'Something broke!' });
      }
    });

// Botando o servidor pra rodar e escutar na porta PORT
  server.listen(PORT, () => {
    console.log(`Server is running and listening at port ${PORT}`);
  });