import { gerarProdutosCategoria, gerarTodosProdutos } from "./módulos/modulos.js";
const data = await fetch('../data/produtos.json');
var produtos = await data.json();

const ul = document.getElementById('catalogo');

gerarTodosProdutos(ul, produtos);