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

    rota.delete('/cadastro', async (req, res, next) => {
        const id = req.query.id;

        try {
            const posicao = await rcd.erase(dadosConta, id);
    
            if (posicao == -1) {
                throw new HTTPError('Código de conta inválido.', 400)
            }    
            res.json({message: 'Conta excluída com sucesso!'});            
        } catch (e) {
            next(e)
        }
    }); 

export default rota;