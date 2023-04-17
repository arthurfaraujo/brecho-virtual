// importação de bibliotecas importantes
  import express from 'express';
  import { readFile } from 'fs/promises';
  import { writeFile } from 'fs/promises';
  import { v4 as uuid } from "uuid";
  import { HTTPError } from '../index.js'

// criação de constantes importantes
  const contas = JSON.parse(await readFile('public/data/contas.json'));
  const rota = express.Router();

// rotas
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

  rota.post('/cadastro', (req, res) => {
    const dados = req.body;
    for (const conta of contas.contas) {
      if (dados.username == conta.username) {
        throw new HTTPError('Cadastro inválido, nome já existe', 400);
      } else {
        continue
      }
    }    
    const id = uuid();
  
    const conta = {id, ...req.body};
  
    contas.contas.push(conta);
  
    writeFile('public/data/contas.json', JSON.stringify(contas, null, 2));
    
    res.send("aaaa");
  });

export default rota;