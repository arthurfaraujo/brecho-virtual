const data = await fetch('../data/produtos.json');
var produtos = await data.json();
// console.log(produtos);

const ul = document.getElementById('catalogo');

for (var i in produtos.produtos) {
  var prodInfo = produtos.produtos[i];
  // console.log(prodInfo);
  var produto = document.createElement('li');
  var preço = document.createElement('p');
  var nome = document.createElement('p');

  nome.innerHTML = 'nome: ' + prodInfo.name;
  preço.innerHTML = 'preço: ' + 'R$ ' + prodInfo.preço;

  produto.appendChild(nome);
  produto.appendChild(preço);

  ul.appendChild(produto);
}
