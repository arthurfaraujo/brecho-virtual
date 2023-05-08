import { geraCategorias, ocultarProdutosCategoria, gerarTodosProdutos } from "./modulos/modulos.js";
const data = await fetch('/data/produtos');
var produtos = await data.json();

const ul = document.getElementById('catalogo');

gerarTodosProdutos(ul, produtos);
geraCategorias(filtros, produtos, ul);

//ocultarProdutosCategoria(ul, 'Objetos')

//gerarProdutosCategoria(ul, produtos, 'Objetos')