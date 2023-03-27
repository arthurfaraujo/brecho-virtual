import express from 'express';
import morgan from 'morgan';

const server = express();

server.use(morgan('tiny'));

server.get('/', (req, res) => {
  res.send('Viva a Anarquiaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
});

server.get('/hello/en', (req, res) => {
  res.send('hello garbage')
});

server.get('/hello/pt', (req, res) => {
  res.send('oi imundo')
});

server.get('/teste/pt', (req, res) => {
  const nome = req.query.nome; 
  const idade =  req.query.idade;
  res.send(`${nome}, ${idade}`);
}); 

server.listen(3000, () => {
  console.log('O servidor está rodando')
});