import { geraCategorias, gerarTodosProdutos } from "./modulos/modulos.js";
const data = await fetch('/data/produtos');
var produtos = await data.json();

const ul = document.getElementById('catalogo');
const select = document.getElementById('filtros');

gerarTodosProdutos(ul, produtos);
geraCategorias(produtos, select);

//ocultarProdutosCategoria(ul, 'Objetos')

//gerarProdutosCategoria(ul, produtos, 'Objetos')