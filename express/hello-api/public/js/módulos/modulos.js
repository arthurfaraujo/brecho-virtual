export function gerarTodosProdutos(lista, dados){
    for (var i in dados.produtos) {
        var prodInfo = dados.produtos[i];
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
        lista.appendChild(produto);
    }
}
  
export function gerarProdutosCategoria(lista, dados, categoria){
    for (var i in dados.produtos) {
        var prodInfo = dados.produtos[i];
        // console.log(prodInfo);
        if (prodInfo.categoria == categoria){        
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
            lista.appendChild(produto);  
        }
    }
}