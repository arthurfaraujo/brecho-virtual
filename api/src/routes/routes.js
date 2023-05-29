// importação de bibliotecas importantes
    import { Router } from 'express';
    import product from '../db/models/Products.js';
    import user from '../db/models/Users.js';

// criação de constantes importantes
    const rota = Router();

// classe de erros específica para erros http
    class HTTPError extends Error {
        constructor(message, code) {
            super(message);
            this.code = code;
        }
    }

//TODO: usar multer para receber imagens através de um form
//TODO: criar o front de cadastro de peça

// rotas home
    rota.get('/', (req, res) => {
        res.render('home.ejs');
    });

    rota.get('/entrada', (req, res) => {
        res.render('entrada.ejs');
    });

    rota.post('/login', async (req, res, next) => {
        const dados = {...req.body};
        try {
            const usuario = await user.auth(dados);
            if (usuario == 1) {
                throw new HTTPError('Usuário e/ou senha incorreto(s).', 400);
            } else {
                res.redirect(`/`);
            }            
        } catch(e) {
            next(e)
        }        
    });

    rota.post('/cadastro/usuario', async (req, res, next) => {
        const dados = {...req.body};
        try {
            const lastid = await user.create(dados);            
            res.json({message: "Cadastro realizado com sucesso!"});
        } catch(e) {
            next(e)
        }
    });

    rota.delete('/cadastro/usuario', async (req, res, next) => {
        const id = req.query.id;

        try {
            const changes = await user.remove(id);
            // console.log(changes);   
            if (changes == 0) {
                throw new HTTPError("Usuário não encontrado.", 400);
            }
            res.json({message: 'Conta excluída com sucesso!'});            
        } catch (e) {
            next(e)
        }
    });

    rota.get('/cadastro/produto', (req, res, next) => {
        res.render('cadastro_produto.ejs');
    })

    rota.post('/cadastro/produto', async (req, res,) => {
        const dados = {...req.body};

        try {
            const lastid = await product.create(dados);            
            res.json({message: "Cadastro realizado com sucesso!"});
        } catch(e) {
            next(e)
        }
    })
    
// rotas data
    rota.get('/data/produtos', async (req, res, next) => {
        try {
            // console.log(await product.rAllP());
            res.json(await product.rAll());
        } catch (e) {
            next(e)
        }
    });

    rota.delete('/data/produtos', async (req, res, next) => {
        const id = req.query.id;
        
        try{
            const changes = await product.remove(id);   
            if (changes == 0) {
                throw new HTTPError("Produto não encontrado.", 400);
            }
            res.json({message: 'Produto removido com sucesso!'});
        } catch(e) {
            next(e);
        }
    });

// Manipular erros sem quebrar o servidor
    // 404
        rota.use((req, res, next) => {
            res.status(404).json({ message: 'Página não encontrada!' });
        });

    // Outros
        rota.use((err, req, res, next) => {
            console.error(err.stack);
            if (err && err instanceof HTTPError) {
                res.status(err.code).json({ message: err.message });
            } else {
                res.status(500).json({ message: 'Algo deu muito errado!' });
            }
        });

export default rota;