import express from 'express';
import morgan from 'morgan';

const server = express();

server.use(morgan('tiny'));

server.get('/', (req, res) => {
  res.send('Viva a Anarquiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
});

server.listen(3000, () => {
  console.log('O servidor está rodando')
});