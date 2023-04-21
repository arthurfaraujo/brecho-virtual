// importação de bibliotecas importantes
  import express from 'express';
  import modProd from '../modulos/dados.js'
  import { HTTPError } from '../index.js';

// criação de contantes importantes
  const produtos = await modProd.read('public/data/produtos.json');
  const rota = express.Router();


// rotas
  rota.get('/produtos', (req, res) => {
      res.json(produtos.leitura);
  });

  rota.post('/produtos', (req, res) => {
    const produto = {...req.body};

    if (Object.values(produto).length !== 4) {
      throw new HTTPError('Produto inválido', 400);
    } else {
      modProd.create(produtos, produto);
    }
    
    
    //modProd.create(produtos, req.body);
  });
  
  rota.delete('/produtos', (req, res) => {
    const id = req.query.id;
    
    if (id) {
      try {
        modProd.erase(produtos, id).catch(err => {throw new HTTPError(err, 400)});
      } catch (e) {
        console.log(e)
      }
    } else {
      throw new HTTPError('ID necessário para remoção.', 400);
    };
  });

export default rota;