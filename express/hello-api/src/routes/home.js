import express from 'express';

const rota = express.Router();

rota.get('/', (req, res) => {
    res.render('index.ejs');
});

rota.get('/login', (req, res) => {
    res.render('login.ejs');
});

rota.post('/login', (req, res) => {
    const dados = {...req.body};

    for (const conta of contas) {
      if ((dados.username == conta.username) & (conta.password == dados.password)) { 
         
        res.redirect('/');
  
      } else {
        // throw new HTTPError('Dados inválidos para login', 400)
        continue
      }
    }
    throw new HTTPError('Usuário não encontrado', 400);
    
});

export default rota;