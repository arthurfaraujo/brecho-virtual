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

  rota.delete('/produtos', (req, res) => {
    const id = req.query.id;

    if (id) {
      // console.log(id);
      const posicao = produtos.produtos.findIndex((conta) => conta.id == id);

      if (posicao == -1) {
        throw new HTTPError('Código de produto inválido.', 400)
      };

      // console.log(posicao);
      produtos.produtos.splice(posicao, 1);
  
      writeFile('public/data/produtos.json', JSON.stringify(produtos, null, 2));

      res.json({message: 'Produto excluído com sucesso!'})
      
    } else {
      throw new HTTPError('ID necessário para remoção.', 400);
    };
  });

export default rota;