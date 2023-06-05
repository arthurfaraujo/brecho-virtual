// importação de bibliotecas importantes
    // models
        import Clothes from '../database/models/clothes.js';
        import Images from '../database/models/productsImages.js';
        import Users from '../database/models/users.js';
    
    // sistema de rotas do express
        import { Router } from 'express';
    
    // bibliotecas de funções variadas
        import multer from 'multer';
        import crypto from 'node:crypto';
        import fs from 'node:fs/promises';
        //TODO: procurar sobre o bcrypt

// criação de constantes importantes
    // constante de uso do router
        const rota = Router();
    
    // configuração do multer
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/img/produtos')
            },

            filename: (req, file, cb) => {
                const extensao = file.originalname.split('.')[1];

                const nomeNovo = crypto.randomBytes(20).toString('hex');

                cb(null, `${nomeNovo}.${extensao}`);
            }
        })
    
    // constante imagens que permite o uso do multer configurado    
        const imagens = multer({storage: storage});

//TODO: enviar os caminhos das imagens na rota de dados dos produtos
//TODO: apagar as imagens ao apagar o registro no banco

// classe de erros específica para erros http
    class HTTPError extends Error {
        constructor(message, code) {
            super(message);
            this.code = code;
        }
    }

// acesso do usuário à parte visual do sistema
    rota.get('/', (req, res) => {
        res.render('home.ejs');
    });

    rota.get('/entrada', (req, res) => {
        res.render('entrada.ejs');
    });

    rota.get('/cadastro/produto', (req, res, next) => {
        res.render('cadastro_produto.ejs');
    })

// acesso do usuário à parte de dados do sistema
    // verifica se o usuário existe e se logou corretamente
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
                next(e);
            }        
        });
    // cadastra um novo usuário
        rota.post('/cadastro/usuario', async (req, res, next) => {
            const dados = {...req.body};
            try {
                const lastid = await Users.create(dados);            
                res.redirect('/entrada');
            } catch(e) {
                next(e);
            }
        });
    // remove um usuário
        rota.delete('/cadastro/usuario', async (req, res, next) => {
            const cod_usr = req.query.cod_usr;

            try {
                const changes = await Users.remove(cod_usr);  
                
                if (changes == 0) {
                    throw new HTTPError("Usuário não encontrado.", 400);
                }

                res.json({message: 'Conta excluída com sucesso!'});            
            } catch (e) {
                next(e);
            }
        });
    // cadastra um produto e suas imagens
        rota.post('/cadastro/produto', imagens.array('imagem', 5), async (req, res, next) => {
            const dados = {...req.body};
            const images = req.files;

            try {
                const lastIdC = await Clothes.create(dados);

                for (const img of images) {
                    const path = img.path;

                    const foto_produto = {cod_pec: lastIdC, url_img: path};
                    
                    const lastIdI = await Images.create(foto_produto);
                }

                res.json({message: "Cadastro realizado com sucesso!"});
            } catch(e) {
                next(e);
            }
        })
    
    // remove um produto
        rota.delete('/cadastro/produto', async (req, res, next) => {
            const cod_pec = req.query.cod_pec;
                
            try{
                const imagens = await Images.readU(cod_pec);
                const changesC = await Clothes.remove(cod_pec);
                
                for (const imagem of imagens) {
                    await fs.unlink(imagem.url_img);
                }

                if (changesC == 0) {
                    throw new HTTPError("Produto não encontrado.", 400);
                }
        
                res.json({message: 'Produto removido com sucesso!'});
            } catch(e) {
                next(e);
            }
        });
        
// acesso do front à parte de dados
    // envia os produtos
        rota.get('/data/produtos', async (req, res, next) => {
            try {
                // console.log(await product.rAllP());
                res.json(await Clothes.readAll());
            } catch (e) {
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