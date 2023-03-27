import express from 'express';

const server = express();

server.get('/', (req, res) => {
  res.send('Viva a Anarquiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
});

server.listen(3000, () => {
  console.log('O servidor está rodando')
});