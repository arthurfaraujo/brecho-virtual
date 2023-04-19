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

      for (const conta of contas.contas) {
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

    if ((dados.username != '') & (dados.password != '')){
      console.log('passei 1');
      for (const conta of contas.contas) {
        if (dados.username == conta.username) {
          throw new HTTPError('Cadastro inválido, nome já existe', 400);
        } else {
          console.log('passei 2');
          continue
        }
      }
    } else {
      throw new HTTPError('Nome de usuário e/ou senha vazio(s).', 400);
    };

    const id = uuid();
  
    const conta = {id, ...req.body};
  
    contas.contas.push(conta);
  
    writeFile('public/data/contas.json', JSON.stringify(contas, null, 2));
    
    res.json({message: "Cadastro realizado com sucesso!"});
  });

  rota.delete('/cadastro', (req, res) => {
    const id = req.query.id;

    if (id) {
      // console.log(id);
      const posicao = contas.contas.findIndex((conta) => conta.id == id);

      if (posicao == -1) {
        throw new HTTPError('Código de conta inválido.', 400)
      };

      // console.log(posicao);
      contas.contas.splice(posicao, 1);
  
      writeFile('public/data/contas.json', JSON.stringify(contas, null, 2));

      res.json({message: 'Conta excluída com sucesso!'})
      
    } else {
      throw new HTTPError('ID necessário para remoção.', 400);
    };
    

  });

export default rota;