// importação de bibliotecas importantes
  import express from 'express';
  import modProd from '../modulos/dados.js'
  import { HTTPError } from '../index.js';

// criação de contantes importantes
  const produtos = await modProd.read('public/data/produtos.json');
  const rota = express.Router();


// rotas
  rota.get('/produtos', (req, res, next) => {
      res.json(produtos.leitura);
  });

  rota.post('/produtos', (req, res, next) => {
    const produto = {...req.body};

    if (Object.values(produto).length !== 4) {
      throw new HTTPError('Produto inválido', 400);
    } else {
      modProd.create(produtos, produto);
    }
    
    
    //modProd.create(produtos, req.body);
  });
  
  rota.delete('/produtos', async (req, res, next) => {
    const id = req.query.id;
    
    try{
      if (id) {      
        const posicao = modProd.erase(produtos, id);
        console.log(posicao);
        if (posicao) {
          throw new HTTPError('ID não encontrado.', 400)
        }
      } else {
        throw new HTTPError('ID necessário para remoção.', 400);
      };
    } catch(e) {
      next(e);
    }
  });

export default rota;