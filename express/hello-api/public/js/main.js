// dinamização da "criação" dos produtos
const data = await fetch('../data/produtos.json');
var produtos = await data.json();
// console.log(produtos);

const ul = document.getElementById('catalogo');

for (var i in produtos.produtos) {
  var prodInfo = produtos.produtos[i];
  // console.log(prodInfo);
  var produto = document.createElement('li');
  var preço = document.createElement('p');
  var nome = document.createElement('h3');
  var imagem = document.createElement('img');
  var botao = document.createElement('button');

  nome.innerHTML = prodInfo.name;
  preço.innerHTML = 'R$ ' + prodInfo.preço;
  imagem.src = prodInfo.imagem;
  botao.innerHTML = 'Comprar'

  produto.appendChild(imagem);
  produto.appendChild(nome);
  produto.appendChild(preço);
  produto.appendChild(botao);

  produto.classList.add("produto");
  imagem.classList.add("imagem-produto");
  ul.appendChild(produto);
}

// quantidade de itens
var total = produtos.produtos.length;