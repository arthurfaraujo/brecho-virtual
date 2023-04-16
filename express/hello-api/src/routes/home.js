// importação de bibliotecas importantes
  import express from 'express';
  import {readFile} from 'fs/promises';
  import { writeFile } from 'fs/promises';
  import {v4 as uuid} from "uuid";

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
      if (req.body) {
        const id = uuid();
        const username = req.body.username;
        const password = req.body.password;

        const conta = {id, username, password};

        contas.contas.push(conta);

        writeFile('public/data/contas.json', JSON.stringify(contas, null, 2));
      } else {
        throw new HTTPError('Cadastro inválido', 400)
      }
  })

export default rota;