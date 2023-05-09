// importação de bibliotecas importantes
    import express from 'express';
    import rcd from '../modulos/rcd.js';
    import user from '../modulos/autenticate.js';

// criação de constantes importantes
    const dadosConta = await rcd.read('public/data/contas.json');
    const contas = dadosConta.leitura.lista;
    const produtos = await rcd.read('public/data/produtos.json');
    const rota = express.Router();

// classe de erros específica para erros http
    class HTTPError extends Error {
        constructor(message, code) {
            super(message);
            this.code = code;
        }
    }

// rotas home
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
    
// rotas data
    rota.get('/data/produtos', (req, res, next) => {
        res.json(produtos.leitura);
    });

    rota.post('/data/produtos', async (req, res, next) => {
    const produto = {...req.body};
    try{
        if (Object.values(produto).length < 4) {
            throw new HTTPError('Produto inválido', 400);
        } else {
            rcd.create(produtos, produto);
            res.json({message: 'Produto criado com sucesso!'})
        }
    } catch(e) {
        next(e)
    }
    
    
    //rcd.create(produtos, req.body);
    });

    rota.delete('/data/produtos', async (req, res, next) => {
    const id = req.query.id;
    
    try{
        if (id) {      
        const posicao = await rcd.erase(produtos, id);
        //console.log(posicao);
        if (posicao) {
            throw new HTTPError('ID não encontrado.', 400)
        }
        } else {
        throw new HTTPError('ID necessário para remoção.', 400);
        }
        res.json({message: 'Produto removido com sucesso!'});
    } catch(e) {
        next(e);
    }
    });

// Manipular erros sem quebrar o servidor
    // 404
        rota.use((req, res, next) => {
            res.status(404).json({ message: 'Content not found!' });
        });

        rota.use((req, res, next) => {
            console.log('oi')
        })

    // Outros
        rota.use((err, req, res, next) => {
            console.error(err.stack);
            if (err && err instanceof HTTPError) {
                res.status(err.code).json({ message: err.message });
            } else {
                res.status(500).json({ message: 'Something broke!' });
            }
        });

export default rota;