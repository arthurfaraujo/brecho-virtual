// importação de bibliotecas importantes
    import express from 'express';
    import rcd from '../modulos/rcd.js';
    import user from '../modulos/user.js';
    import { HTTPError } from '../index.js';

// criação de constantes importantes
    const dadosConta = await rcd.read('public/data/contas.json');
    const contas = dadosConta.leitura.lista;
    const rota = express.Router();

// rotas
    rota.get('/', (req, res) => {
        res.render('index.ejs');
    });

    rota.get('/login', (req, res) => {
        res.render('login.ejs');
        //res.json({message: 'Deu certo!'});
    });

    rota.post('/login', async (req, res, next) => {
        const dados = {...req.body}
        try {
            const usuario = await user.autenticate(dados, contas);
            if (usuario == 1) {
                throw new HTTPError('Usuário e/ou senha incorreto(s).', 400);
            } else {
                res.redirect(`/?id=${usuario}`);
            }            
        } catch(e) {
            next(e)
        }        
    });

    rota.post('/cadastro', async (req, res, next) => {
        const dados = {...req.body};
        try {
            const nomeExiste = await user.checkname(dados.nome, contas);
            if (nomeExiste == 1) {
                throw new HTTPError('Nome de usuário já existe.', 400);
            }    
            rcd.create(dadosConta, dados);            
            res.json({message: "Cadastro realizado com sucesso!"});
        } catch(e) {
            next(e)
        }
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