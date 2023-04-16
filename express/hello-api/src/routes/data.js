// importação de bibliotecas importantes
  import express from 'express';
  import {readFile} from 'fs/promises';
  import { writeFile } from 'fs/promises';
  import {v4 as uuid} from "uuid";

// criação de contantes importantes 
  const produtos = JSON.parse(await readFile('public/data/produtos.json'));
  const rota = express.Router();

// rotas
  rota.get('/produtos', (req, res) => {
      res.json(produtos);
  });

  rota.post('/produtos', (req, res) => {
    if (req.body) {
      const id = uuid();
      const produto = req.body;

      produtos.produtos.push({id, ...produto});

      writeFile('public/data/produtos.json', JSON.stringify(produtos, null, 2));
    } else {
      throw new HTTPError('Cadastro de produto inválido', 400)
    }
  });

export default rota;