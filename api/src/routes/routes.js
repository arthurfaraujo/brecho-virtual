// importação de bibliotecas importantes
    import { Router } from 'express';
    import Clothes from '../database/models/clothes.js';
    import Images from '../database/models/productsImages.js';
    import user from '../db/models/Users.js';
    import Users from '../database/models/users.js';
    import multer from 'multer';
    import crypto from 'node:crypto';
    // import { createClient } from '@supabase/supabase-js';

// criação de constantes importantes
    const rota = Router();
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public/img')
        },

        filename: (req, file, cb) => {
            const extensao = file.originalname.split('.')[1];

            const nomeNovo = crypto.randomBytes(20).toString('hex');

            cb(null, `${nomeNovo}.${extensao}`);
        }
    })
    const imagens = multer({storage: storage})

// classe de erros específica para erros http
    class HTTPError extends Error {
        constructor(message, code) {
            super(message);
            this.code = code;
        }
    }

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
            const lastid = await Users.create(dados);            
            res.redirect('/entrada');
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

    rota.post('/cadastro/produto', imagens.array('imagem', 5), async (req, res, next) => {
        const dados = {...req.body};
        const images = req.files;

        try {
            const lastIdP = await Clothes.create(dados);
            const cod_pec = await Clothes.readCod(dados);


            for (const img of images) {
                const lastIdF = await Images.create(cod_pec.cod_pec, img.path);
            }

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