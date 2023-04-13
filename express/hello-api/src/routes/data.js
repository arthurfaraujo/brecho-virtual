import express from 'express';
import {readFile} from 'fs/promises';


const produtos = JSON.parse(await readFile('public/data/produtos.json'));

const rota = express.Router();

rota.get('/produtos', (req, res) => {
    res.json(produtos);
});

rota.post('/produtos', (req, res) => {
    const produto = req.body;

    produtos.produtos.push({...produto})

    console.log(produtos.produtos)
  });

export default rota;